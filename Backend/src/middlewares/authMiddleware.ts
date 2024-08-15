import express, { Request, Response , NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomUserPayload {
  username: string;
  id: number;
  position: string;
  fired: string;
}

interface CustomRequest extends Request {
  user?: CustomUserPayload | string | JwtPayload;
}

const validateToken = async (req: CustomRequest, res: Response , next : NextFunction ) : Promise<Response | void> => {


  const authorizationHeader = req.headers.authorization;
  
  if (!authorizationHeader) {
    return res.status(401).json({ error: "User not logged in!" })
  }; 

  try {
    const [bearer, token] = authorizationHeader.split(' ');
    const validToken = jwt.verify(token, "secretKey");
    req.user = validToken

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(401).json({ error: "User not logged in!" });
  }
  
}


const validateManger = async (req: CustomRequest, res: Response , next : NextFunction ) : Promise<Response | void> => { 
  try {
    const manger = req.user as CustomUserPayload

    
    if (manger.position == "Manger") {
      return next(); 
    }
    else {
      return res.status(403).json({ error: "Access denied. Not a manager." });
    }
    
  } catch (err) {
    return res.status(401).json({ error: "Access by Only Mangers!" });
  }
  
  
}


export { validateManger ,  validateToken }; 