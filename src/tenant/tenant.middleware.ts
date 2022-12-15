import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { set, get } from 'async-local-storage';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const tenantName: string = req.headers.host.split('.')[0];
        set('tenant', tenantName);
        next();
    }
}