module.exports = [
  {
    script: "./api/dist/index.js",
    name: "app",
    exec_mode: "cluster",
    instances: 2,
  },
  {
    script: "worker.js",
    name: "worker",
  },
];
