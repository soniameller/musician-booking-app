import { Request, Response } from 'express';
import * as MusicianService from '../services/musicianService';

export const getMusicians = async (req: Request, res: Response) => {
  try {
    const musicians = await MusicianService.fetchEnabledMusicians();
    res.json(musicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
