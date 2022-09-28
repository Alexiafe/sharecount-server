import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const config = new DocumentBuilder().setTitle('ShareCount').setDescription('The ShareCount API description').setVersion('1.0').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const PORT = process.env.PORT || 3000
  await app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
  })

}
bootstrap()
