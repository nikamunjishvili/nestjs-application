import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { GqlExecutionContext } from '@nestjs/graphql';
  
  @Injectable()
  export class GqlAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;
  
      const token = this.extractTokenFromHeader(req);
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token);
        req.user = payload;
      } catch {
        throw new UnauthorizedException('Invalid token');
      }
      return true;
    }
  
    private extractTokenFromHeader(request: any): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  