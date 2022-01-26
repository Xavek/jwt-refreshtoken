## User Authentication System with Headless JsonwebTokens with implementation of refresh tokens with httpOnly cookie for persisted user auth.

1. Before 10 to 20 seconds _AcessTokens_ exprires, it would send request for _RefreshTokens_ from client side.
2. Server would issue new _AcessTokens_ with short expire time and same process as 1 would repeat.
3. Every time server would send both _AcessTokens_ and _RefreshToken_.
