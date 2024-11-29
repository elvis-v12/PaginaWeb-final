import { Request, Response } from 'express';
import path from 'path';

export const sendHtmlPage = (page: string) => (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'html', `${page}.html`));
};
