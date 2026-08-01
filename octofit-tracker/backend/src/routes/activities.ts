import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user', 'name email');
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.create(req.body);
    const populated = await activity.populate('user', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity', details: String(error) });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('user', 'name email');
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity', details: String(error) });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
