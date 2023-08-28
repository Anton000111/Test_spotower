const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: 'admin@admin.io',
      name: 'Admin',
      password: 'Admin001',
      dashboards: {
        create: {
          title: 'New apple in the bunch',
          description: 'Introducing our Iced Apple Crisp Oatmilk Shaken Espresso with a perfectly balanced taste.',
          buttonText: 'Order now',
          imageUrl: 'https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-85266.jpg',
          backgroundColor: '#76232f',
          textColor: '#fff'
        },
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })