from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import uvicorn
from typing import Dict, Any
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 应用生命周期管理
@asynccontextmanager
async def lifespan(app: FastAPI):
	# 启动时执行
	print("🚀 财富守护者游戏服务器启动中...")
	
	# 初始化数据库连接
	# await init_database()
	
	# 初始化AI模型
	# await init_ai_models()
	
	print("✅ 服务器启动完成！")
	
	yield
	
	# 关闭时执行
	print("🔄 服务器关闭中...")
	# await close_database()
	print("✅ 服务器已关闭")

# 创建FastAPI应用
app = FastAPI(
	title="财富守护者：卡牌远征 API",
	description="财商教育游戏后端服务",
	version="0.1.0",
	docs_url="/docs",
	redoc_url="/redoc",
	lifespan=lifespan
)

# 配置CORS
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# 健康检查端点
@app.get("/")
async def root():
	return {
		"message": "财富守护者：卡牌远征 API",
		"version": "0.1.0",
		"status": "running"
	}

@app.get("/health")
async def health_check():
	return {
		"status": "healthy",
		"timestamp": "2025-01-27T18:00:00Z"
	}

# 游戏相关API端点
@app.get("/api/game/status")
async def get_game_status():
	"""获取游戏状态"""
	return {
		"status": "active",
		"current_phase": "menu",
		"player_count": 0,
		"server_time": "2025-01-27T18:00:00Z"
	}

@app.get("/api/cards")
async def get_cards():
	"""获取卡牌列表"""
	# 这里应该从数据库或配置文件获取卡牌数据
	return {
		"cards": [
			{
				"id": "stock-tech-001",
				"name": "科技股",
				"type": "asset",
				"assetType": "stock",
				"baseReturn": 8.5,
				"baseRisk": 7,
				"cost": 40
			},
			{
				"id": "bond-gov-001",
				"name": "政府债券",
				"type": "asset",
				"assetType": "bond",
				"baseReturn": 3.2,
				"baseRisk": 2,
				"cost": 15
			},
			{
				"id": "skill-diversify-001",
				"name": "分散配置",
				"type": "skill",
				"skillType": "diversification",
				"cost": 20
			}
		]
	}

@app.get("/api/market/events")
async def get_market_events():
	"""获取市场事件"""
	return {
		"events": [
			{
				"id": "event-bull-001",
				"name": "牛市狂奔",
				"type": "bull_run",
				"description": "市场情绪高涨，股票类资产收益提升",
				"effects": [
					{
						"type": "asset_modifier",
						"target": "stock",
						"modifier": 1.5
					}
				]
			},
			{
				"id": "event-crisis-001",
				"name": "金融危机",
				"type": "economic_crisis",
				"description": "市场恐慌，高风险资产大幅下跌",
				"effects": [
					{
						"type": "asset_modifier",
						"target": "crypto",
						"modifier": 0.5
					}
				]
			}
		]
	}

@app.post("/api/game/calculate-returns")
async def calculate_returns(portfolio: Dict[str, Any]):
	"""计算投资组合收益"""
	try:
		# 这里应该实现复杂的收益计算逻辑
		total_return = 0
		risk_score = 0
		
		for asset in portfolio.get("assets", []):
			base_return = asset.get("baseReturn", 0)
			quantity = asset.get("quantity", 0)
			invested_amount = asset.get("investedAmount", 0)
			
			# 简单的收益计算
			asset_return = (base_return / 100) * invested_amount
			total_return += asset_return
			
			# 风险评分
			risk_score += asset.get("baseRisk", 5) * quantity
		
		return {
			"totalReturn": round(total_return, 2),
			"riskScore": min(risk_score, 100),
			"diversificationScore": len(portfolio.get("assets", [])),
			"message": "收益计算完成"
		}
	except Exception as e:
		raise HTTPException(status_code=400, detail=f"计算失败: {str(e)}")

@app.post("/api/ai/coach")
async def ai_coach_message(message: Dict[str, str]):
	"""AI教练对话"""
	user_message = message.get("message", "")
	
	# 这里应该调用OpenAI API或其他LLM服务
	# 暂时返回预设回复
	responses = {
		"分散": "分散投资是降低风险的好方法！建议将资金分配到不同类型的资产中。",
		"风险": "投资总是有风险的，关键是要了解自己能承受多少风险。",
		"长期": "长期投资通常比短期投机更稳定，复利效应会让你的财富增长。",
		"学习": "继续学习财商知识，这会让你成为更好的投资者！"
	}
	
	# 简单的关键词匹配
	response = "我是你的AI投资教练！有什么问题都可以问我。"
	for keyword, reply in responses.items():
		if keyword in user_message:
			response = reply
			break
	
	return {
		"response": response,
		"timestamp": "2025-01-27T18:00:00Z",
		"suggestions": [
			"分散投资",
			"风险管理",
			"长期投资",
			"学习财商"
		]
	}

# 错误处理
@app.exception_handler(404)
async def not_found_handler(request, exc):
	return {
		"error": "Not Found",
		"message": "请求的资源不存在",
		"path": str(request.url)
	}

@app.exception_handler(500)
async def internal_error_handler(request, exc):
	return {
		"error": "Internal Server Error",
		"message": "服务器内部错误",
		"path": str(request.url)
	}

# 启动服务器
if __name__ == "__main__":
	port = int(os.getenv("PORT", 8000))
	uvicorn.run(
		"main:app",
		host="0.0.0.0",
		port=port,
		reload=True,
		log_level="info"
	)
