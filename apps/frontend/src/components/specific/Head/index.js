/* eslint-disable react/prop-types */
import React from "react";
import Head from "next/head";

import { meta } from "../../../constants";
import { capitalize } from "../../../utils/atoms";

function Common({ children }) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{meta.general.title}</title>
      <meta name="twitter:text:title" content={meta.general.title} />
      <meta property="og:title" content={meta.general.title} />

      <meta name="description" key="description" content={meta.general.description} />
      <meta property="og:description" key="og:description" content={meta.general.description} />
      <meta name="twitter:description" key="twitter:description" content={meta.general.description} />

      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:url" key="og:url" content={meta.general.baseUrl} />
      <meta property="og:image" key="og:image" content={`${meta.general.baseUrl}/meta/facebook.png`} />
      <meta property="og:image:alt" key="og:image:alt" content={meta.general.alt} />
      <meta property="og:image:height" key="og:image:height" content="838" />
      <meta property="og:image:width" key="og:image:width" content="1600" />
      <meta property="og:locale" key="og:locale" content="en_GB" />

      <meta name="twitter:card" key="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" key="twitter:image" content={`${meta.general.baseUrl}/meta/twitter.png`} />
      <meta name="twitter:image:alt" key="twitter:image:alt" content={meta.general.alt} />
      <meta name="twitter:site" key="twitter:site" content={meta.general.site} />
      <meta name="twitter:creator”" key="twitter:creator”" content={meta.general.creator} />

      <link rel="apple-touch-icon" sizes="180x180" href="/meta/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/meta/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/meta/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/meta/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
      {children}
    </Head>
  );
}

export function Landing() {
  const titleLanding = "ConnSuite | The online business card";
  return (
    <Common>
      <title>{titleLanding}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={titleLanding} />
      <meta property="og:title" key="og:title" content={titleLanding} />
    </Common>
  );
}

export function Dashboard() {
  return (
    <Common>
      <title>{meta.dashboard.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.dashboard.title} />
      <meta property="og:title" key="og:title" content={meta.dashboard.title} />
    </Common>
  );
}

export function Business() {
  return (
    <Common>
      <title>{meta.business.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.business.title} />
      <meta property="og:title" key="og:title" content={meta.business.title} />
    </Common>
  );
}

export function Portfolio() {
  return (
    <Common>
      <title>{meta.portfolio.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.portfolio.title} />
      <meta property="og:title" key="og:title" content={meta.portfolio.title} />
    </Common>
  );
}

export function Analytics() {
  return (
    <Common>
      <title>{meta.analytics.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.analytics.title} />
      <meta property="og:title" key="og:title" content={meta.analytics.title} />
    </Common>
  );
}

export function NetworkCreate() {
  return (
    <Common>
      <title>{meta.network.create.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.network.create.title} />
      <meta property="og:title" key="og:title" content={meta.network.create.title} />
    </Common>
  );
}

export function NetworkEdit({ title: network }) {
  const title = `Edit ${capitalize(network)}`;

  return (
    <Common>
      <title>{title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={title} />
      <meta property="og:title" key="og:title" content={title} />
    </Common>
  );
}

export function ArticleCreate() {
  return (
    <Common>
      <title>{meta.article.create.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.article.create.title} />
      <meta property="og:title" key="og:title" content={meta.article.create.title} />
    </Common>
  );
}

export function ArticleEdit({ title: article }) {
  const title = `Edit ${capitalize(article)}`;

  return (
    <Common>
      <title>{title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={title} />
      <meta property="og:title" key="og:title" content={title} />
    </Common>
  );
}

export function ProfileEdit() {
  return (
    <Common>
      <title>{meta.profile.edit.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.profile.edit.title} />
      <meta property="og:title" key="og:title" content={meta.profile.edit.title} />
    </Common>
  );
}

export function ArticleViewer({ name = "", title: article = "", username = "", createdAt = "", description = "" }) {
  const title = `${article} by @${username}| ${meta.general.title}`;

  return (
    <Common>
      <title>{title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={title} />
      <meta property="og:title" key="og:title" content={title} />

      <meta property="og:type" key="og:type" content="article" />
      <meta property="og:article:author" key="og:article:author" content={name} />
      <meta property="og:article:published_time" key="og:type" content={createdAt} />

      <meta name="description" key="description" content={description} />
      <meta property="og:description" key="og:description" content={description} />
      <meta name="twitter:description" key="twitter:description" content={description} />
    </Common>
  );
}

export function ProfileViewer({ first = "", last = "", name = "", username = "", description = "" }) {
  const title = `${name} @${username}`;

  return (
    <Common>
      <title>{title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={title} />
      <meta property="og:title" key="og:title" content={title} />

      <meta property="og:type" key="og:type" content="profile" />
      <meta property="og:profile:first_name" key="og:profile:first_name" content={first} />
      <meta property="og:profile:last_name" key="og:profile:last_name" content={last} />
      <meta property="og:profile:username" key="og:profile:username" content={username} />

      <meta name="description" key="description" content={description} />
      <meta property="og:description" key="og:description" content={description} />
      <meta name="twitter:description" key="twitter:description" content={description} />
    </Common>
  );
}
