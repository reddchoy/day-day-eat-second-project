import type { Request, Response, NextFunction } from "express";

export const isLoggedInStatic = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  
    if (req.session.user) {
      next();
    } else {
      res.redirect("/");
    }
  };
  
  export const isLoggedInApi = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
      res.status(401).json({ message: "請先登入" });
    } else {
      next();
    }
  };
