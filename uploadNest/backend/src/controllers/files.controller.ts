import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHander.middleware';
import { UploadSourceEnum } from '../models/file.model';
import { HTTPSTATUS } from '../config/http.config';
import {
  deleteFilesService,
  downloadFilesService,
  getAllFilesService,
  getFileUrlService,
  uploadFilesService,
} from '../services/files.service';
import {
  deleteFilesSchema,
  downloadFilesSchema,
  fileIdSchema,
} from '../validators/files.validator';

export const uploadFilesViaWebController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const files = req.files as Express.Multer.File[];
    const uploadedVia = UploadSourceEnum.WEB;

    const results = await uploadFilesService(userId, files, uploadedVia);

    return res.status(HTTPSTATUS.OK).json(results);
  },
);

export const uploadFilesViaApiController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const files = req.files as Express.Multer.File[];
    const uploadedVia = UploadSourceEnum.API;

    const results = await uploadFilesService(userId, files, uploadedVia);

    return res.status(HTTPSTATUS.OK).json(results);
  },
);

export const getAllFilesController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const filter = {
      keyword: req.query.keyword as string | undefined,
    };
    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 20,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const result = await getAllFilesService(userId, filter, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: 'All files retrueved successfully',
      ...result,
    });
  },
);

export const deleteFilesController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { fileIds } = deleteFilesSchema.parse(req.body);

    const result = await deleteFilesService(userId, fileIds);

    return res.status(HTTPSTATUS.OK).json({
      message: 'Files deleted successfully',
      ...result,
    });
  },
);

export const downloadFilesController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { fileIds } = downloadFilesSchema.parse(req.body);

    const result = await downloadFilesService(userId, fileIds);

    return res.status(HTTPSTATUS.OK).json({
      message: 'File download URL successfully',
      downloadUrl: result?.url,
      isZip: result?.isZip || false,
    });
  },
);

export const publicGetFileUrlController = asyncHandler(
  async (req: Request, res: Response) => {
    const fileId = fileIdSchema.parse(req.params.fileId);
    const { url, stream, contentType, fileSize } =
      await getFileUrlService(fileId);

    res.set({
      'Content-Type': contentType,
      'Content-Length': fileSize,
      'Cache-Control': 'public, max-age=3600',
      'Content-Disposition': 'inline',
      'X-Content-Type-Options': 'nosniff',
    });

    stream.pipe(res);
    // //302
    // return res.redirect(url);
  },
);
