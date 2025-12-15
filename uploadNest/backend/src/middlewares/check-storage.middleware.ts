import { Request, Response, NextFunction } from 'express';
import { BadRequestException, UnauthorizedException } from '../utils/app-error';
import StorageModel from '../models/storage.model';
import { logger } from '../utils/logger';

export const CheckStorageAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files =
      (req.files as Express.Multer.File[]) || (req.file ? [req.file] : []);

    if (!files || files.length === 0)
      throw new BadRequestException('No file uploaded');

    const userId = req.user?._id;
    if (!userId) throw new UnauthorizedException('Unauthorized access');

    const totalFileSize = files.reduce((sum, file) => sum + file.size, 0);

    const result = await StorageModel.validateUpload(userId, totalFileSize);

    logger.info(`Storage result: ${JSON.stringify(result)}`);

    next();
  } catch (error) {
    next(error);
  }
};
