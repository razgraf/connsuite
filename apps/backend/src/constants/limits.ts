export const MIN_PASSWORD_LENGTH = 8;
export const MAX_MASSWORD_LENGTH = 50;

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 50;

export const MIN_NETWORK_TITLE_LENGTH = 1;
export const MAX_NETWORK_TITLE_LENGTH = 100;

export const MIN_NETWORK_USERNAME_LENGTH = 2;
export const MAX_NETWORK_USERNAME_LENGTH = 50;

export const MIN_NETWORK_DESCRIPTION_LENGTH = 2;
export const MAX_NETWORK_DESCRIPTION_LENGTH = 500;

export const MAX_NETWORK_ICON_SIZE = 5 * 1024 * 1024;
export const ALLOWED_NETWORK_ICON_FORMAT = ["jpg", "jpeg", "gif", "png"];

export const MIN_ARTICLE_TITLE_LENGTH = 5;
export const MAX_ARTICLE_TITLE_LENGTH = 144;

export const MIN_ARTICLE_SKILLS_TITLE_LENGTH = 1;
export const MAX_ARTICLE_SKILLS_TITLE_LENGTH = 20;

export const MAX_ARTICLE_SKILLS_COUNT = 30;

export const MAX_ARTICLE_COVER_SIZE = 12 * 1024 * 1024;
export const ALLOWED_ARTICLE_COVER_FORMAT = ["jpeg", "png"];

export const MAX_FILE_SIZE = Math.max(MAX_NETWORK_ICON_SIZE, 0);
export const ALLOWED_FILE_FORMAT = [...ALLOWED_NETWORK_ICON_FORMAT, ...ALLOWED_ARTICLE_COVER_FORMAT];