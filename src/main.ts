import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { networkInterfaces } from "os";
import { AppModule } from "./app.module";

function getLocalIP(): string {
  const nets = networkInterfaces();
  const results = Object.create(null);

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  for (const name of Object.keys(results)) {
    if (results[name].length > 0) {
      return results[name][0];
    }
  }

  return "IP not found";
}

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
    .setTitle("Wealthcare API")
    .setDescription(
      "API para gerenciamento de saúde com Clean Architecture e DDD"
    )
    .setVersion("1.0")
    .addTag("doctors")
    .addTag("doctor-schedules")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = 3000;
  const localIP = getLocalIP();

  await app.listen(port);

  console.log("\n🚀 Wealthcare API is running on:");
  console.log(`   Local:    http://localhost:${port}/api`);
  console.log(`   Network:  http://${localIP}:${port}/api`);
  console.log("\n📚 Swagger documentation available at:");
  console.log(`   Local:    http://localhost:${port}/api/docs`);
  console.log(`   Network:  http://${localIP}:${port}/api/docs\n`);
}

bootstrap();
