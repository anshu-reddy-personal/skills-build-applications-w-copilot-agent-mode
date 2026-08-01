import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User, Team, Activity, Leaderboard, Workout } from '../models/index.js';

dotenv.config();

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    // Clear existing collections for a clean seed
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);
    console.log('Cleared existing collections');

    // Users - Mergington High School students and staff
    const users = await User.insertMany([
      {
        email: 'paul.octo@mergingtonghs.edu',
        name: 'Paul Octo',
        password: 'password123',
        age: 42,
        team: 'Faculty Mentors',
      },
      {
        email: 'jessica.cat@mergingtonghs.edu',
        name: 'Jessica Cat',
        password: 'password123',
        age: 38,
        team: 'Faculty Mentors',
      },
      {
        email: 'alex.rivera@student.mergingtonghs.edu',
        name: 'Alex Rivera',
        password: 'password123',
        age: 16,
        team: 'Blue Sharks',
      },
      {
        email: 'sam.patel@student.mergingtonghs.edu',
        name: 'Sam Patel',
        password: 'password123',
        age: 17,
        team: 'Blue Sharks',
      },
      {
        email: 'jordan.lee@student.mergingtonghs.edu',
        name: 'Jordan Lee',
        password: 'password123',
        age: 15,
        team: 'Blue Sharks',
      },
      {
        email: 'taylor.nguyen@student.mergingtonghs.edu',
        name: 'Taylor Nguyen',
        password: 'password123',
        age: 16,
        team: 'Gold Eagles',
      },
      {
        email: 'morgan.brooks@student.mergingtonghs.edu',
        name: 'Morgan Brooks',
        password: 'password123',
        age: 17,
        team: 'Gold Eagles',
      },
      {
        email: 'casey.kim@student.mergingtonghs.edu',
        name: 'Casey Kim',
        password: 'password123',
        age: 15,
        team: 'Gold Eagles',
      },
      {
        email: 'riley.santos@student.mergingtonghs.edu',
        name: 'Riley Santos',
        password: 'password123',
        age: 16,
        team: 'Green Turtles',
      },
      {
        email: 'avery.chen@student.mergingtonghs.edu',
        name: 'Avery Chen',
        password: 'password123',
        age: 18,
        team: 'Green Turtles',
      },
    ]);
    console.log(`Inserted ${users.length} users`);

    const [
      paul,
      jessica,
      alex,
      sam,
      jordan,
      taylor,
      morgan,
      casey,
      riley,
      avery,
    ] = users;

    // Teams
    const teams = await Team.insertMany([
      {
        name: 'Blue Sharks',
        description: 'Speed and endurance focused student team',
        members: [alex._id, sam._id, jordan._id],
      },
      {
        name: 'Gold Eagles',
        description: 'Strength training and competitive challenges',
        members: [taylor._id, morgan._id, casey._id],
      },
      {
        name: 'Green Turtles',
        description: 'Steady progress and wellness-first approach',
        members: [riley._id, avery._id],
      },
      {
        name: 'Faculty Mentors',
        description: 'Teachers and staff supporting student fitness',
        members: [paul._id, jessica._id],
      },
    ]);
    console.log(`Inserted ${teams.length} teams`);

    const [blueSharks, goldEagles, greenTurtles, facultyMentors] = teams;

    // Activities
    const now = Date.now();
    const daysAgo = (n: number) => new Date(now - n * 24 * 60 * 60 * 1000);

    const activities = await Activity.insertMany([
      {
        user: alex._id,
        type: 'running',
        durationMinutes: 35,
        distanceKm: 5.2,
        caloriesBurned: 420,
        date: daysAgo(1),
        notes: 'Morning track interval run',
      },
      {
        user: alex._id,
        type: 'strength',
        durationMinutes: 40,
        caloriesBurned: 280,
        date: daysAgo(3),
        notes: 'Upper body circuit',
      },
      {
        user: sam._id,
        type: 'cycling',
        durationMinutes: 50,
        distanceKm: 14.5,
        caloriesBurned: 510,
        date: daysAgo(2),
        notes: 'Neighborhood loop',
      },
      {
        user: jordan._id,
        type: 'walking',
        durationMinutes: 30,
        distanceKm: 2.4,
        caloriesBurned: 140,
        date: daysAgo(1),
        notes: 'After-school walk',
      },
      {
        user: jordan._id,
        type: 'swimming',
        durationMinutes: 45,
        distanceKm: 1.5,
        caloriesBurned: 360,
        date: daysAgo(4),
        notes: 'Pool freestyle sets',
      },
      {
        user: taylor._id,
        type: 'running',
        durationMinutes: 28,
        distanceKm: 4.0,
        caloriesBurned: 340,
        date: daysAgo(1),
        notes: 'Tempo run around campus',
      },
      {
        user: morgan._id,
        type: 'strength',
        durationMinutes: 55,
        caloriesBurned: 390,
        date: daysAgo(2),
        notes: 'Full-body weight session',
      },
      {
        user: casey._id,
        type: 'cycling',
        durationMinutes: 40,
        distanceKm: 11.0,
        caloriesBurned: 430,
        date: daysAgo(3),
        notes: 'Bike path intervals',
      },
      {
        user: riley._id,
        type: 'walking',
        durationMinutes: 45,
        distanceKm: 3.5,
        caloriesBurned: 180,
        date: daysAgo(1),
        notes: 'Park trail with friends',
      },
      {
        user: avery._id,
        type: 'running',
        durationMinutes: 42,
        distanceKm: 6.1,
        caloriesBurned: 480,
        date: daysAgo(2),
        notes: 'Long easy run',
      },
      {
        user: paul._id,
        type: 'strength',
        durationMinutes: 30,
        caloriesBurned: 220,
        date: daysAgo(1),
        notes: 'Demo workout for PE class',
      },
      {
        user: jessica._id,
        type: 'walking',
        durationMinutes: 25,
        distanceKm: 1.8,
        caloriesBurned: 110,
        date: daysAgo(2),
        notes: 'Campus walk between meetings',
      },
    ]);
    console.log(`Inserted ${activities.length} activities`);

    // Leaderboard (all-time points)
    const leaderboard = await Leaderboard.insertMany([
      { user: avery._id, team: greenTurtles._id, points: 1280, rank: 1, period: 'all-time' },
      { user: morgan._id, team: goldEagles._id, points: 1195, rank: 2, period: 'all-time' },
      { user: alex._id, team: blueSharks._id, points: 1120, rank: 3, period: 'all-time' },
      { user: sam._id, team: blueSharks._id, points: 1045, rank: 4, period: 'all-time' },
      { user: taylor._id, team: goldEagles._id, points: 980, rank: 5, period: 'all-time' },
      { user: casey._id, team: goldEagles._id, points: 910, rank: 6, period: 'all-time' },
      { user: jordan._id, team: blueSharks._id, points: 860, rank: 7, period: 'all-time' },
      { user: riley._id, team: greenTurtles._id, points: 790, rank: 8, period: 'all-time' },
      { user: paul._id, team: facultyMentors._id, points: 640, rank: 9, period: 'all-time' },
      { user: jessica._id, team: facultyMentors._id, points: 520, rank: 10, period: 'all-time' },
    ]);
    console.log(`Inserted ${leaderboard.length} leaderboard entries`);

    // Workouts - personalized suggestions
    const workouts = await Workout.insertMany([
      {
        name: 'Beginner Campus Walk-Run',
        description: 'Alternate walking and light jogging around the school track.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['5 min warm-up walk', '6 x 1 min jog / 1 min walk', '5 min cool-down'],
        suggestedFor: ['beginners', 'walking', 'running'],
      },
      {
        name: 'Blue Shark Speed Intervals',
        description: 'Short high-intensity running intervals for endurance teams.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Dynamic stretches', '8 x 200m sprints', 'Core finisher', 'Cool-down jog'],
        suggestedFor: ['Blue Sharks', 'running', 'intermediate'],
      },
      {
        name: 'Gold Eagle Strength Circuit',
        description: 'Bodyweight and free-weight circuit for strength gains.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Squats', 'Push-ups', 'Lunges', 'Dumbbell rows', 'Plank holds'],
        suggestedFor: ['Gold Eagles', 'strength'],
      },
      {
        name: 'Green Turtle Steady State',
        description: 'Low-impact cardio focused on consistency and recovery.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Brisk walk', 'Light cycling', 'Mobility stretches'],
        suggestedFor: ['Green Turtles', 'walking', 'cycling', 'recovery'],
      },
      {
        name: 'Swim Endurance Set',
        description: 'Pool workout building aerobic capacity.',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: ['400m warm-up', '8 x 100m freestyle', '4 x 50m kick', '200m cool-down'],
        suggestedFor: ['swimming', 'advanced'],
      },
      {
        name: 'Full-Body Home Strength',
        description: 'No-equipment strength session students can do at home.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Bird-dogs', 'Wall sit'],
        suggestedFor: ['beginners', 'strength', 'home'],
      },
    ]);
    console.log(`Inserted ${workouts.length} workouts`);

    console.log('Database seeding complete');
    console.log({
      users: users.length,
      teams: teams.length,
      activities: activities.length,
      leaderboard: leaderboard.length,
      workouts: workouts.length,
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
