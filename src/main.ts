import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Recipe API")
    .setDescription(
      "API para gerenciamento de receitas com Clean Architecture e DDD"
    )
    .setVersion("1.0")
    .addTag("recipes")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(3000);
  console.log("Recipe API is running on http://localhost:3000/api");
  console.log(
    "Swagger documentation available at http://localhost:3000/api/docs"
  );
}

bootstrap();
