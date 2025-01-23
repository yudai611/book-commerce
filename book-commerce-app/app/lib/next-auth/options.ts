import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../prisma";

export const nextAuthOptions: NextAuthOptions = {
    debug: false,//認証プロセスのデバック情報をコンソールに表示するかどうかを設定
    //google,Xなどでのログインを追加する場合は以下に設定する。
    providers: [
        //githubアカウントでのログイン設定
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,//IDを設定する
            clientSecret: process.env.GITHUB_SECRET!,//シークレットキーを設定する
        }),
    ],

    /*PrismaAdapterを使用して、NextAuth.jsをPrismaと連携させ、
    NextAuth.jsでの認証情報(ユーザー、セッション、アカウント情報)をPrismaのデータベースに保存する。
    PrismaAdapterをインストールし、引数にインスタンス化したprismaを渡す。*/
    adapter: PrismaAdapter(prisma),

    //ログインしているかどうかの判断をするためセッションを返す設定をする。
    callbacks: {
        //セッションコールバックでセッションオブジェクトのカスタマイズ、追加のデータをセッションに含める。
        session: ({session, user}) => {
            return {
                ...session,//既存のセッション情報を保持
                user: {
                    ...session.user,//既存のユーザー情報を保持
                    id: user.id,//ユーザーIDをセッション情報に追加
                },
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET,

}