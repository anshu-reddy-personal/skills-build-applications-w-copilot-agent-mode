import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User, SALT_ROUNDS } from '../models/User.js';

const router = Router();

interface WritableUserData {
  email?: string;
  name?: string;
  password?: string;
  age?: number;
  team?: string;
}

function pickWritableFields(body: Record<string, unknown>): WritableUserData {
  const data: WritableUserData = {};

  if (typeof body.email === 'string') {
    data.email = body.email;
  }
  if (typeof body.name === 'string') {
    data.name = body.name;
  }
  if (typeof body.password === 'string') {
    data.password = body.password;
  }
  if (typeof body.age === 'number') {
    data.age = body.age;
  } else if (typeof body.age === 'string' && body.age.trim() !== '' && !Number.isNaN(Number(body.age))) {
    data.age = Number(body.age);
  }
  if (typeof body.team === 'string') {
    data.team = body.team;
  }

  return data;
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password').sort({ name: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const data = pickWritableFields(req.body as Record<string, unknown>);
    const user = await User.create(data);
    const result = user.toObject();
    delete result.password;
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user', details: String(error) });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const data = pickWritableFields(req.body as Record<string, unknown>);

    // findByIdAndUpdate bypasses document middleware, so hash here when needed
    if (data.password && data.password.length > 0) {
      data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    } else {
      delete data.password;
    }

    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    }).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user', details: String(error) });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
