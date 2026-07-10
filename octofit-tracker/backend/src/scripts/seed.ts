import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Chen',
        email: 'ava@example.com',
        fitnessGoal: 'Build endurance',
        experienceLevel: 'Intermediate',
      },
      {
        name: 'Marcus Reed',
        email: 'marcus@example.com',
        fitnessGoal: 'Increase strength',
        experienceLevel: 'Advanced',
      },
      {
        name: 'Lina Patel',
        email: 'lina@example.com',
        fitnessGoal: 'Improve mobility',
        experienceLevel: 'Beginner',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'River Runners',
        sport: 'Running',
        members: [users[0].name, users[1].name],
        captain: users[0].name,
      },
      {
        name: 'Power Crew',
        sport: 'Strength',
        members: [users[1].name, users[2].name],
        captain: users[1].name,
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        durationMinutes: 45,
        caloriesBurned: 500,
        date: new Date('2026-07-10T06:00:00.000Z'),
      },
      {
        userId: users[1]._id.toString(),
        type: 'Strength',
        durationMinutes: 60,
        caloriesBurned: 700,
        date: new Date('2026-07-09T18:30:00.000Z'),
      },
      {
        userId: users[2]._id.toString(),
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 220,
        date: new Date('2026-07-08T07:15:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id.toString(),
        username: users[0].name,
        score: 980,
        rank: 1,
      },
      {
        userId: users[1]._id.toString(),
        username: users[1].name,
        score: 945,
        rank: 2,
      },
      {
        userId: users[2]._id.toString(),
        username: users[2].name,
        score: 900,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Tempo Run',
        focus: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        equipment: ['Running shoes'],
      },
      {
        name: 'Full Body Strength',
        focus: 'Strength',
        difficulty: 'Advanced',
        durationMinutes: 50,
        equipment: ['Dumbbells', 'Bench'],
      },
      {
        name: 'Mobility Flow',
        focus: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        equipment: ['Yoga mat'],
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, activities, leaderboard entries, and workouts.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
