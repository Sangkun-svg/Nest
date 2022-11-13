import * as jwt from 'jsonwebtoken';

// access token : userid tokenid
// refresh token : tokenid rotationCounter

const JWT_SECRET = process.env.JWT_SECRET ?? 'DevSecretKey';
if (process.env.JWT_SECRET === undefined) {
  console.warn('JWT_SECRET is not defined in .env file');
}

interface AccessTokenPayload {
  type: 'access_token';
  userId: number;
  tokenId: number;
  username: string;
}
interface RefreshTokenPayload {
  type: 'refresh_token';
  tokenId: number;
  rotationCounter: number;
}
type TokenPayload = AccessTokenPayload | RefreshTokenPayload;

type DecodedToken<T> = {
  iat: number;
  exp: number;
} & T;

const tokenDuration = {
  access_token: '1h',
  refresh_token: '30d',
} as const;

export const generateToken = (payload: TokenPayload) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: tokenDuration[payload.type],
      },
      (err, token) => {
        if (err || !token) {
          console.log(err);
          return reject(err);
        }
        return resolve(token);
      },
    );
  });
};

export const validateToken = <T>(token: string) => {
  return new Promise<DecodedToken<T>>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      }
      return resolve(decoded as DecodedToken<T>);
    });
  });
};
