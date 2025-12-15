import { Router } from 'express';
import { multiUpload } from '../../../config/multer.config';
import { CheckStorageAvailability } from '../../../middlewares/check-storage.middleware';
import { uploadFilesViaApiController } from '../../../controllers/files.controller';

const fileV1Routes = Router();

fileV1Routes.post(
  '/upload',
  multiUpload,
  CheckStorageAvailability,
  uploadFilesViaApiController,
);

export default fileV1Routes;
