import {Context} from 'egg';
import ResError from '../core/ResError';
export default () => {
    return async (ctx: Context, next: any) => {
        try {
            if (ctx.jwt.type === 'error') {
                ctx.user = null;
                return await next();
            }
            const _id = ctx.jwt.decode._id;
            const user = await ctx.model.User.findById(_id);
            if (!user || !user.jwtList) {
                throw new Error('error in find user and jwtList');
            }
            if (user.jwtList.indexOf(ctx.jwt.decode.iat) === -1) {
                throw new ResError('jwt has been deprecated', 401);
            }
            const expires = ctx.app.config.jwt.expires
                ? ctx.app.config.jwt.expires
                : 3600;
            for (let i = 0; i < user.jwtList.length; i++) {
                if (new Date().getTime() / 1000 - user.jwtList[i] > expires) {
                    user.jwtList.splice(i, 1);
                }
            }
            await user.save();
            ctx.user = user;
            await next();
        } catch (error) {
            ctx.throw(error);
        }
    };
};
