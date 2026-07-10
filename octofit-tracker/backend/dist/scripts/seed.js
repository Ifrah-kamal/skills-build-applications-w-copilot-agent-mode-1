"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.LeaderboardEntry.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.insertMany([
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
        const teams = await team_1.Team.insertMany([
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
        await activity_1.Activity.insertMany([
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
        await leaderboard_1.LeaderboardEntry.insertMany([
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
        await workout_1.Workout.insertMany([
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
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
