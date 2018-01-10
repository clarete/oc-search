// @flow
import type { $Request, $Response } from 'express';
import { doSearch } from './search';

export async function index(req: $Request, res: $Response): mixed {
  res.sendStatus(200);
}

export async function search(req: $Request, res: $Response): mixed {
  res.status(200).json(await doSearch(req.query.q));
}
