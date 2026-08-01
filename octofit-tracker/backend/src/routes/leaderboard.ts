import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const period = typeof req.query.period === 'string' ? req.query.period : undefined;
    const filter = period ? { period } : {};
    const entries = await Leaderboard.find(filter)
      .populate('user', 'name email')
      .populate('team', 'name')
      .sort({ points: -1, rank: 1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id)
      .populate('user', 'name email')
      .populate('team', 'name');
    if (!entry) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.create(req.body);
    const populated = await entry.populate([
      { path: 'user', select: 'name email' },
      { path: 'team', select: 'name' },
    ]);
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry', details: String(error) });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('user', 'name email')
      .populate('team', 'name');
    if (!entry) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard entry', details: String(error) });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) {
      res.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete leaderboard entry' });
  }
});

export default router;
