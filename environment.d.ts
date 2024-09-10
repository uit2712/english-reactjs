declare namespace NodeJS {
    interface ProcessEnv {
        //types of envs
        NODE_ENV: 'development' | 'production' | 'test';
        PUBLIC_URL: string;
        REACT_APP_API_URL: string;
        REACT_APP_BOOKING_APP_INTERNAL_NAME: string;
        REACT_APP_ADMIN_ID: string;
        REACT_APP_NARRATOR_ID: string;
        REACT_APP_SUPPORTER_ID: string;
    }
}
