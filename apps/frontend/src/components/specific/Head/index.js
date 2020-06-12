/* eslint-disable react/prop-types */
import React from "react";
import Head from "next/head";

import { meta } from "../../../constants";
import { capitalize } from "../../../utils/atoms";

function Common() {
  return (
    <>
      <meta charSet="utf-8" />
      <title>{meta.general.title}</title>
      <meta name="twitter:text:title" content={meta.general.title} />
      <meta property="og:title" content={meta.general.title} />

      <meta name="description" key="description" content={meta.general.description} />

      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:url" key="og:url" content={meta.general.baseUrl} />
      <meta property="og:description" key="og:description" content={meta.general.description} />
      <meta property="og:image" key="og:image" content={`${meta.general.baseUrl}/meta/facebook.png`} />
      <meta property="og:image:alt" key="og:image:alt" content={meta.general.alt} />
      <meta property="og:image:height" key="og:image:height" content="838" />
      <meta property="og:image:width" key="og:image:width" content="1600" />
      <meta property="og:locale" key="og:locale" content="en_GB" />

      <meta name="twitter:card" key="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" key="twitter:description" content={meta.general.description} />
      <meta name="twitter:image" key="twitter:image" content={`${meta.general.baseUrl}/meta/twitter.png`} />
      <meta name="twitter:image:alt" key="twitter:image:alt" content={meta.general.alt} />
      <meta name="twitter:site" key="twitter:site" content={meta.general.site} />
      <meta name="twitter:creator”" key="twitter:creator”" content={meta.general.creator} />
    </>
  );
}

export function Dashboard() {
  return (
    <Head>
      <Common />
      <title>{meta.dashboard.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.dashboard.title} />
      <meta property="og:title" key="og:title" content={meta.dashboard.title} />
    </Head>
  );
}

export function Business() {
  return (
    <Head>
      <Common />
      <title>{meta.business.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.business.title} />
      <meta property="og:title" key="og:title" content={meta.business.title} />
    </Head>
  );
}

export function Portfolio() {
  return (
    <Head>
      <Common />
      <title>{meta.portfolio.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.portfolio.title} />
      <meta property="og:title" key="og:title" content={meta.portfolio.title} />
    </Head>
  );
}

export function Analytics() {
  return (
    <Head>
      <Common />
      <title>{meta.analytics.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.analytics.title} />
      <meta property="og:title" key="og:title" content={meta.analytics.title} />
    </Head>
  );
}

export function NetworkCreate() {
  return (
    <Head>
      <Common />
      <title>{meta.network.create.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.network.create.title} />
      <meta property="og:title" key="og:title" content={meta.network.create.title} />
    </Head>
  );
}

export function NetworkEdit({ title: network }) {
  const title = `${capitalize(network)} | ${meta.network.edit.title}`;

  return (
    <Head>
      <Common />
      <title>{title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={title} />
      <meta property="og:title" key="og:title" content={title} />
    </Head>
  );
}

export function ArticleCreate() {
  return (
    <Head>
      <Common />
      <title>{meta.article.create.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.article.create.title} />
      <meta property="og:title" key="og:title" content={meta.article.create.title} />
    </Head>
  );
}

export function ArticleEdit({ title: article }) {
  const title = `${capitalize(article)} | ${meta.article.edit.title}`;

  return (
    <Head>
      <Common />
      <title>{title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={title} />
      <meta property="og:title" key="og:title" content={title} />
    </Head>
  );
}

export function ProfileEdit() {
  return (
    <Head>
      <Common />
      <title>{meta.profile.edit.title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={meta.profile.edit.title} />
      <meta property="og:title" key="og:title" content={meta.profile.edit.title} />
    </Head>
  );
}

export function ArticleViewer({ name = "", title: article = "", username = "", createdAt = "" }) {
  const title = `${article} by @${username}| ${meta.general.title}`;

  return (
    <Head>
      <Common />
      <title>{title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={title} />
      <meta property="og:title" key="og:title" content={title} />

      <meta property="og:type" key="og:type" content="article" />
      <meta property="og:article:author" key="og:article:author" content={name} />
      <meta property="og:article:published_time" key="og:type" content={createdAt} />
    </Head>
  );
}

export function ProfileViewer({ first = "", last = "", name = "", username = "" }) {
  const title = `${name} @${username}`;

  return (
    <Head>
      <Common />
      <title>{title}</title>
      <meta name="twitter:text:title" key="twitter:text:title" content={title} />
      <meta property="og:title" key="og:title" content={title} />

      <meta property="og:type" key="og:type" content="profile" />
      <meta property="og:profile:first_name" key="og:profile:first_name" content={first} />
      <meta property="og:profile:last_name" key="og:profile:last_name" content={last} />
      <meta property="og:profile:username" key="og:profile:username" content={username} />
    </Head>
  );
}
