'use client';

import { SessionProvider } from "next-auth/react";//アプリケーションで認証セッション(ユーザーのログイン状態)を管理するライブラリ。
import { FC, PropsWithChildren } from 'react';

//クライアント側でセッション情報を管理(useSessionやgetSession)するにはSessionProviderで全体をラップする
export const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
}