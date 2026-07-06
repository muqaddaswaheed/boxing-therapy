/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Mongoose out of the bundler graph (it has native/optional deps that
  // break Turbopack's module graph). It runs as a normal Node dependency.
  serverExternalPackages: ["mongoose", "nodemailer"],
  // Limit build parallelism to avoid out-of-memory on low-RAM machines.
  experimental: {
    cpus: 2,
  },
};

export default nextConfig;
