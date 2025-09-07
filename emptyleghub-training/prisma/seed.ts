import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@emptyleghub.com' },
    update: {},
    create: {
      email: 'test@emptyleghub.com',
      password: hashedPassword,
      name: 'Test User'
    }
  })

  // Create training modules
  const modules = [
    {
      title: 'Introduction to EmptyLegHub',
      description: 'Learn about our company mission, values, and operations',
      duration: 30,
      order: 1,
      content: JSON.stringify([
        {
          type: 'heading',
          content: 'Welcome to EmptyLegHub'
        },
        {
          type: 'paragraph',
          content: 'EmptyLegHub is a leading logistics company specializing in optimizing empty container movements and reducing deadhead miles in the transportation industry.'
        },
        {
          type: 'heading',
          content: 'Our Mission'
        },
        {
          type: 'paragraph',
          content: 'Our mission is to revolutionize the logistics industry by creating efficient networks that minimize empty trips and maximize resource utilization.'
        },
        {
          type: 'highlight',
          content: 'Key Point: Every empty mile eliminated saves fuel, reduces emissions, and increases profitability.'
        },
        {
          type: 'heading',
          content: 'Core Values'
        },
        {
          type: 'list',
          items: [
            'Efficiency - We optimize every route and movement',
            'Sustainability - We reduce environmental impact',
            'Innovation - We leverage technology to solve problems',
            'Collaboration - We work together with partners',
            'Integrity - We operate with transparency and honesty'
          ]
        }
      ]),
      questions: [
        {
          question: 'What is the primary focus of EmptyLegHub?',
          options: JSON.stringify([
            'Manufacturing containers',
            'Optimizing empty container movements',
            'Selling transportation equipment',
            'Managing warehouses'
          ]),
          correct: 1,
          order: 1
        },
        {
          question: 'Which of the following is NOT one of EmptyLegHub\'s core values?',
          options: JSON.stringify([
            'Efficiency',
            'Competition',
            'Sustainability',
            'Innovation'
          ]),
          correct: 1,
          order: 2
        },
        {
          question: 'What does eliminating empty miles achieve?',
          options: JSON.stringify([
            'Increases fuel consumption',
            'Reduces profitability',
            'Saves fuel and reduces emissions',
            'Slows down delivery times'
          ]),
          correct: 2,
          order: 3
        },
        {
          question: 'EmptyLegHub specializes in which industry?',
          options: JSON.stringify([
            'Healthcare',
            'Retail',
            'Logistics',
            'Finance'
          ]),
          correct: 2,
          order: 4
        },
        {
          question: 'What does "deadhead miles" refer to?',
          options: JSON.stringify([
            'Miles driven with cargo',
            'Miles driven without cargo',
            'Total miles driven',
            'Miles to the destination'
          ]),
          correct: 1,
          order: 5
        },
        {
          question: 'How does EmptyLegHub approach problem-solving?',
          options: JSON.stringify([
            'Through manual processes only',
            'By avoiding technology',
            'By leveraging technology',
            'Through outsourcing'
          ]),
          correct: 2,
          order: 6
        },
        {
          question: 'What is emphasized in EmptyLegHub\'s collaboration value?',
          options: JSON.stringify([
            'Working alone',
            'Working together with partners',
            'Avoiding partnerships',
            'Internal competition'
          ]),
          correct: 1,
          order: 7
        },
        {
          question: 'EmptyLegHub\'s mission includes revolutionizing which aspect?',
          options: JSON.stringify([
            'The fashion industry',
            'The food industry',
            'The logistics industry',
            'The entertainment industry'
          ]),
          correct: 2,
          order: 8
        },
        {
          question: 'What does resource utilization mean in EmptyLegHub\'s context?',
          options: JSON.stringify([
            'Wasting resources',
            'Maximizing the use of available resources',
            'Ignoring available resources',
            'Minimizing resource usage'
          ]),
          correct: 1,
          order: 9
        },
        {
          question: 'Which value relates to environmental impact?',
          options: JSON.stringify([
            'Efficiency',
            'Sustainability',
            'Innovation',
            'Integrity'
          ]),
          correct: 1,
          order: 10
        }
      ]
    },
    {
      title: 'Safety Protocols and Procedures',
      description: 'Essential safety guidelines for all team members',
      duration: 45,
      order: 2,
      content: JSON.stringify([
        {
          type: 'heading',
          content: 'Safety First at EmptyLegHub'
        },
        {
          type: 'paragraph',
          content: 'Safety is our top priority. This module covers essential safety protocols that all team members must follow to ensure a safe working environment.'
        },
        {
          type: 'heading',
          content: 'Personal Protective Equipment (PPE)'
        },
        {
          type: 'list',
          items: [
            'Hard hats must be worn in all operational areas',
            'High-visibility vests are required in vehicle zones',
            'Safety glasses protect against debris',
            'Steel-toed boots prevent foot injuries',
            'Gloves should be worn when handling equipment'
          ]
        },
        {
          type: 'highlight',
          content: 'Remember: PPE is your last line of defense. Always use proper procedures first.'
        },
        {
          type: 'heading',
          content: 'Vehicle Safety'
        },
        {
          type: 'paragraph',
          content: 'When operating or working around vehicles, always maintain awareness of your surroundings. Use the three-point contact rule when entering or exiting vehicles.'
        },
        {
          type: 'heading',
          content: 'Emergency Procedures'
        },
        {
          type: 'list',
          items: [
            'Know the location of all emergency exits',
            'Familiarize yourself with fire extinguisher locations',
            'Understand evacuation procedures',
            'Report all incidents immediately',
            'Know emergency contact numbers'
          ]
        }
      ]),
      questions: [
        {
          question: 'What is the top priority at EmptyLegHub?',
          options: JSON.stringify([
            'Speed',
            'Profit',
            'Safety',
            'Innovation'
          ]),
          correct: 2,
          order: 1
        },
        {
          question: 'Which PPE item protects against foot injuries?',
          options: JSON.stringify([
            'Hard hat',
            'Safety glasses',
            'Steel-toed boots',
            'High-visibility vest'
          ]),
          correct: 2,
          order: 2
        },
        {
          question: 'Where must high-visibility vests be worn?',
          options: JSON.stringify([
            'In offices only',
            'In vehicle zones',
            'During breaks',
            'Only at night'
          ]),
          correct: 1,
          order: 3
        },
        {
          question: 'What is the three-point contact rule for?',
          options: JSON.stringify([
            'Lifting objects',
            'Entering or exiting vehicles',
            'Using tools',
            'Walking on stairs'
          ]),
          correct: 1,
          order: 4
        },
        {
          question: 'What should you do with all incidents?',
          options: JSON.stringify([
            'Ignore minor ones',
            'Report only major ones',
            'Report all incidents immediately',
            'Wait until the end of shift'
          ]),
          correct: 2,
          order: 5
        },
        {
          question: 'PPE is described as your what?',
          options: JSON.stringify([
            'First line of defense',
            'Last line of defense',
            'Only protection needed',
            'Optional equipment'
          ]),
          correct: 1,
          order: 6
        },
        {
          question: 'What should you know the location of for emergencies?',
          options: JSON.stringify([
            'Break rooms',
            'Parking spots',
            'Emergency exits',
            'Manager offices'
          ]),
          correct: 2,
          order: 7
        },
        {
          question: 'When should gloves be worn?',
          options: JSON.stringify([
            'Only in cold weather',
            'When handling equipment',
            'During meetings',
            'Never'
          ]),
          correct: 1,
          order: 8
        },
        {
          question: 'What protects against debris?',
          options: JSON.stringify([
            'Hard hats',
            'Safety glasses',
            'Vests',
            'Boots'
          ]),
          correct: 1,
          order: 9
        },
        {
          question: 'What should you familiarize yourself with for fire safety?',
          options: JSON.stringify([
            'Water fountain locations',
            'Break room locations',
            'Fire extinguisher locations',
            'Parking lot exits'
          ]),
          correct: 2,
          order: 10
        }
      ]
    },
    {
      title: 'Customer Service Excellence',
      description: 'Delivering exceptional service to our clients',
      duration: 40,
      order: 3,
      content: JSON.stringify([
        {
          type: 'heading',
          content: 'Excellence in Every Interaction'
        },
        {
          type: 'paragraph',
          content: 'At EmptyLegHub, every team member is a representative of our company. This module will help you deliver exceptional service to our clients.'
        },
        {
          type: 'heading',
          content: 'The Five Pillars of Service'
        },
        {
          type: 'list',
          items: [
            'Responsiveness - Reply promptly to all inquiries',
            'Reliability - Do what you say you will do',
            'Professionalism - Maintain high standards always',
            'Problem-solving - Find solutions, not excuses',
            'Communication - Keep clients informed'
          ]
        },
        {
          type: 'heading',
          content: 'Handling Difficult Situations'
        },
        {
          type: 'paragraph',
          content: 'When faced with challenges, remember the LEAP approach: Listen actively, Empathize genuinely, Apologize if needed, and Provide solutions.'
        },
        {
          type: 'highlight',
          content: 'Pro Tip: A satisfied customer tells 3 people. An unsatisfied customer tells 10. Make every interaction count!'
        },
        {
          type: 'heading',
          content: 'Building Long-term Relationships'
        },
        {
          type: 'paragraph',
          content: 'Focus on creating partnerships, not just transactions. Understand client needs, anticipate challenges, and always deliver more value than expected.'
        }
      ]),
      questions: [
        {
          question: 'What are team members considered at EmptyLegHub?',
          options: JSON.stringify([
            'Just employees',
            'Representatives of the company',
            'Independent contractors',
            'Temporary workers'
          ]),
          correct: 1,
          order: 1
        },
        {
          question: 'How many pillars of service are there?',
          options: JSON.stringify([
            'Three',
            'Four',
            'Five',
            'Six'
          ]),
          correct: 2,
          order: 2
        },
        {
          question: 'What does the "L" in LEAP stand for?',
          options: JSON.stringify([
            'Learn',
            'Listen actively',
            'Look',
            'Leave'
          ]),
          correct: 1,
          order: 3
        },
        {
          question: 'According to the module, how many people does a satisfied customer tell?',
          options: JSON.stringify([
            '1 person',
            '3 people',
            '5 people',
            '10 people'
          ]),
          correct: 1,
          order: 4
        },
        {
          question: 'What should you focus on creating with clients?',
          options: JSON.stringify([
            'Just transactions',
            'Partnerships',
            'Competition',
            'Distance'
          ]),
          correct: 1,
          order: 5
        },
        {
          question: 'Which pillar emphasizes doing what you say you will do?',
          options: JSON.stringify([
            'Responsiveness',
            'Reliability',
            'Professionalism',
            'Communication'
          ]),
          correct: 1,
          order: 6
        },
        {
          question: 'What approach should you use for difficult situations?',
          options: JSON.stringify([
            'JUMP',
            'SKIP',
            'LEAP',
            'RUN'
          ]),
          correct: 2,
          order: 7
        },
        {
          question: 'How many people does an unsatisfied customer typically tell?',
          options: JSON.stringify([
            '3 people',
            '5 people',
            '8 people',
            '10 people'
          ]),
          correct: 3,
          order: 8
        },
        {
          question: 'What should you find instead of excuses?',
          options: JSON.stringify([
            'Problems',
            'Solutions',
            'Complaints',
            'Delays'
          ]),
          correct: 1,
          order: 9
        },
        {
          question: 'What should you always deliver to clients?',
          options: JSON.stringify([
            'Less than expected',
            'Exactly what\'s expected',
            'More value than expected',
            'Minimum service'
          ]),
          correct: 2,
          order: 10
        }
      ]
    }
  ]

  // Create modules with questions
  for (const moduleData of modules) {
    const { questions, ...moduleInfo } = moduleData
    
    await prisma.trainingModule.upsert({
      where: { 
        title: moduleInfo.title 
      },
      update: {
        ...moduleInfo,
        questions: {
          deleteMany: {},
          create: questions
        }
      },
      create: {
        ...moduleInfo,
        questions: {
          create: questions
        }
      }
    })
  }

  console.log('Seed data created successfully!')
  console.log('Test user credentials:')
  console.log('Email: test@emptyleghub.com')
  console.log('Password: password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })