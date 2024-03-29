"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROTECTED_USERNAMES = exports.ALLOWED_FILE_FORMAT = exports.MAX_FILE_SIZE = exports.ALLOWED_ARTICLE_COVER_FORMAT = exports.MAX_ARTICLE_COVER_SIZE = exports.MIN_ARTICLE_SECTION_COUNT = exports.MAX_ARTICLE_CATEGORIES_COUNT = exports.MIN_ARTICLE_CATEGORIES_COUNT = exports.MAX_ARTICLE_CATEGORIES_TITLE_LENGTH = exports.MIN_ARTICLE_CATEGORIES_TITLE_LENGTH = exports.MAX_ARTICLE_SKILLS_COUNT = exports.MAX_ARTICLE_SKILLS_TITLE_LENGTH = exports.MIN_ARTICLE_SKILLS_TITLE_LENGTH = exports.MAX_ARTICLE_TITLE_LENGTH = exports.MIN_ARTICLE_TITLE_LENGTH = exports.ALLOWED_NETWORK_ICON_FORMAT = exports.MAX_NETWORK_ICON_SIZE = exports.MAX_NETWORK_DESCRIPTION_LENGTH = exports.MIN_NETWORK_DESCRIPTION_LENGTH = exports.MAX_NETWORK_USERNAME_LENGTH = exports.MIN_NETWORK_USERNAME_LENGTH = exports.MAX_NETWORK_TITLE_LENGTH = exports.MIN_NETWORK_TITLE_LENGTH = exports.MAX_USER_TAGLINE_LENGTH = exports.MIN_USER_TAGLINE_LENGTH = exports.MAX_USER_DESCRIPTION_LENGTH = exports.MIN_USER_DESCRIPTION_LENGTH = exports.ALLOWED_USER_PICTURE_FORMAT = exports.MAX_USER_PICTURE_SIZE = exports.FORMAT_USERNAME = exports.MAX_USERNAME_LENGTH = exports.MIN_USERNAME_LENGTH = exports.MAX_NAME_LENGTH = exports.MIN_NAME_LENGTH = exports.MAX_MASSWORD_LENGTH = exports.MIN_PASSWORD_LENGTH = void 0;
exports.MIN_PASSWORD_LENGTH = 8;
exports.MAX_MASSWORD_LENGTH = 50;
exports.MIN_NAME_LENGTH = 2;
exports.MAX_NAME_LENGTH = 50;
exports.MIN_USERNAME_LENGTH = 3;
exports.MAX_USERNAME_LENGTH = 50;
exports.FORMAT_USERNAME = /^[A-Za-z0-9\_\-\.]+$/;
exports.MAX_USER_PICTURE_SIZE = 12 * 1024 * 1024;
exports.ALLOWED_USER_PICTURE_FORMAT = ["jpeg", "png"];
exports.MIN_USER_DESCRIPTION_LENGTH = 2;
exports.MAX_USER_DESCRIPTION_LENGTH = 500;
exports.MIN_USER_TAGLINE_LENGTH = 2;
exports.MAX_USER_TAGLINE_LENGTH = 50;
exports.MIN_NETWORK_TITLE_LENGTH = 1;
exports.MAX_NETWORK_TITLE_LENGTH = 100;
exports.MIN_NETWORK_USERNAME_LENGTH = 2;
exports.MAX_NETWORK_USERNAME_LENGTH = 50;
exports.MIN_NETWORK_DESCRIPTION_LENGTH = 2;
exports.MAX_NETWORK_DESCRIPTION_LENGTH = 500;
exports.MAX_NETWORK_ICON_SIZE = 5 * 1024 * 1024;
exports.ALLOWED_NETWORK_ICON_FORMAT = ["jpg", "jpeg", "gif", "png"];
exports.MIN_ARTICLE_TITLE_LENGTH = 5;
exports.MAX_ARTICLE_TITLE_LENGTH = 144;
exports.MIN_ARTICLE_SKILLS_TITLE_LENGTH = 1;
exports.MAX_ARTICLE_SKILLS_TITLE_LENGTH = 20;
exports.MAX_ARTICLE_SKILLS_COUNT = 50;
exports.MIN_ARTICLE_CATEGORIES_TITLE_LENGTH = 1;
exports.MAX_ARTICLE_CATEGORIES_TITLE_LENGTH = 20;
exports.MIN_ARTICLE_CATEGORIES_COUNT = 1;
exports.MAX_ARTICLE_CATEGORIES_COUNT = 6;
exports.MIN_ARTICLE_SECTION_COUNT = 1;
exports.MAX_ARTICLE_COVER_SIZE = 12 * 1024 * 1024;
exports.ALLOWED_ARTICLE_COVER_FORMAT = ["jpeg", "png"];
exports.MAX_FILE_SIZE = Math.max(exports.MAX_NETWORK_ICON_SIZE, 0);
exports.ALLOWED_FILE_FORMAT = [
    ...exports.ALLOWED_NETWORK_ICON_FORMAT,
    ...exports.ALLOWED_ARTICLE_COVER_FORMAT,
];
exports.PROTECTED_USERNAMES = [
    "dashboard",
    "article",
    "portfolio",
    "business",
    "businesscard",
    "analytics",
    "profile",
    "about",
    "edit",
    "add",
    "remove",
    "view",
    "image",
    "images",
    "faq",
    "card",
    "scan",
    "network",
    "search",
    "talent",
    "badge",
    "api",
    "share",
    "username",
    "null",
    "undefined",
    "true",
    "false",
];
