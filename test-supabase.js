// Test script to verify Supabase connection and projects fetching
import { getProjects, getProjectsCount } from './models/project.js';

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test basic connection
    const projects = await getProjects(1, 10);
    console.log(`✅ Found ${projects.length} projects`);
    
    // Test count
    const count = await getProjectsCount();
    console.log(`✅ Total projects count: ${count}`);
    
    // Test first few projects
    if (projects.length > 0) {
      console.log('📋 First project sample:');
      console.log(`  - Name: ${projects[0].name}`);
      console.log(`  - Title: ${projects[0].title}`);
      console.log(`  - Status: ${projects[0].status}`);
      console.log(`  - Category: ${projects[0].category}`);
    }
    
    return {
      success: true,
      projectCount: count,
      sampleProjects: projects.slice(0, 3)
    };
    
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the test
if (import.meta.main) {
  testSupabaseConnection();
}