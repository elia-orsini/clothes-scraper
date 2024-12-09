module.exports = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.mercdn.net",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.mercari-shops-static.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.buyee.jp",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdnyauction-pctr.buyee.jp",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "img.alicdn.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};
