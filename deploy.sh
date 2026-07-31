#!/bin/bash
# 人形机器人开源生态导航 - Cloud Run 部署脚本
# 需要: Docker + gcloud CLI

PROJECT_ID="ais-dev"
SERVICE_NAME="humanoid-eco-nav"
REGION="asia-northeast1"

echo "=== 1/3 构建 Docker 镜像 ==="
docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME .

echo "=== 2/3 推送镜像到 GCR ==="
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME

echo "=== 3/3 部署到 Cloud Run ==="
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --port 8080

echo "=== 完成 ==="
gcloud run services describe $SERVICE_NAME --region $REGION --format="value(status.url)"
