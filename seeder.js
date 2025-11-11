// seeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const bcrypt = require("bcrypt");

const connectDB = require("./config/db");
const Blog = require("./models/blogModel");
const User = require("./models/userModel");

dotenv.config();

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const seedBlogs = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      console.log("Seeding disabled in production".red);
      process.exit(0);
    }

    await connectDB();
    await Blog.deleteMany();
    console.log("Old blogs removed".yellow);

    // Ensure a demo user exists
    let user = await User.findOne();
    if (!user) {
      const demoPassword = "demo12345";
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(demoPassword, salt);

      user = await User.create({
        name: "Demo User",
        email: "demo@example.com",
        password: hashed,
      });

      console.log("Demo user created ✓".green);
    }

    const blogs = [
      {
        title: "The Subtle Art of Writing Clean Code",
        excerpt:
          "Clean code emphasizes readability, maintainability, and clarity. It allows teams to work efficiently and reduces long-term technical debt.",
        content: `
Writing clean code is not only about making the computer understand your logic, but also about making it easy for other humans to follow your thought process. Code should tell a story — one that is clear, concise, and logical.

A good rule is: if someone new opens your file and immediately understands what’s happening, you’ve written clean code. That means meaningful naming, consistent formatting, and avoiding unnecessary complexity.

Refactoring should be a habit, not a rare activity. Improving your code continuously ensures the project stays healthy and scalable.
        `,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        category: "Development",
      },

      {
        title: "How Mindfulness Can Boost Developer Productivity",
        excerpt:
          "Mental clarity plays a crucial role in productivity. Mindfulness practices help maintain focus during extended coding sessions.",
        content: `
Developers often push through hours of work without pausing, which leads to mental fatigue. Mindfulness encourages awareness of your thoughts and energy levels during work.

Taking short breaks can dramatically restore clarity. Techniques such as deep breathing, stretching, or simply stepping away from the desk can refresh cognitive performance.

Sustainable productivity comes not from working harder but from preserving mental energy.
        `,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        category: "Lifestyle",
      },

      {
        title: "Building a Full-Stack App with MERN in 2025",
        excerpt:
          "The MERN stack remains one of the most reliable architectures for modern web applications due to flexibility and scalability.",
        content: `
The MERN stack consists of MongoDB, Express.js, React, and Node.js. Each part works together to support full-stack development with one programming language — JavaScript.

In 2025, cloud deployment platforms and serverless technologies have made MERN apps easier to scale. Integrating authentication, caching, and optimized folder structures leads to professional-grade applications.

The key is to separate concerns: keep business logic in the server, UI state management in React, and data rules in your database layer.
        `,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        category: "Development",
      },

      {
        title: "The Science of Sleep: Recharge Like a Pro",
        excerpt:
          "Quality sleep is essential for cognitive function, memory retention, and emotional balance.",
        content: `
Sleep affects brain function more than any productivity hack. During deep sleep, the brain organizes information, heals neural pathways, and restores focus capacity.

Maintaining a consistent sleep schedule is the most effective way to improve energy levels during the day. Avoiding screens before bed and creating a calm environment further enhances rest.

Creative thinking and problem-solving rely heavily on a rested mind.
        `,
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        category: "Health",
      },

      {
        title: "Design Thinking: A Framework for Innovation",
        excerpt:
          "Design Thinking focuses on understanding user needs before designing solutions, improving both usability and impact.",
        content: `
Design Thinking encourages empathy-driven problem solving. Instead of assuming what users want, you observe, interview, and research to understand real challenges.

The framework includes five stages: empathize, define, ideate, prototype, and test. Each step allows iterative learning and refinement.

When used effectively, Design Thinking reduces guesswork and leads to meaningful product experiences.
        `,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657",
        category: "Design",
      },
    ].map((b) => ({ ...b, slug: slugify(b.title), author: user._id }));

    await Blog.insertMany(blogs);

    console.log("Blogs seeded successfully ✓".green);
    process.exit();
  } catch (error) {
    console.error(error.red);
    process.exit(1);
  }
};

seedBlogs();
