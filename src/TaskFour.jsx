import React, { useState, useEffect } from "react";

function TaskFour() {
  const [userData, setUserData] = useState([]); // 用戶資料
  const [loading, setLoading] = useState(true); // 載入狀態
  const [error, setError] = useState(""); // 錯誤訊息
  const [activeTab, setActiveTab] = useState(0); // 目前選中的頁籤

  // 在頁面載入時發送請求取得用戶資料
  useEffect(() => {
    const fetchData = async () => {
      // 開啟載入中訊息
      setLoading(true);
      // 清空錯誤訊息
      setError("");
      try {
        const urls = ["/api/users/1", "/api/users/2"];
        // 使用Promise.all一起發送請求
        const res = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        );
        // 設置用戶資料
        setUserData(res);
      } catch (err) {
        // 設置錯誤訊息
        setError("載入失敗，請稍後再試");
      } finally {
        // 完成載入
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9 mx-auto">
          <h2 className="mb-4">題目四：⽤⼾信息分⾴（卡片和⾴籤）</h2>

          {/* 載入狀態 */}
          {loading && <p className="mt-3 text-center">載入中...</p>}

          {/* 錯誤訊息 */}
          {error && <p className="mt-3 text-center text-danger">{error}</p>}

          {/* 頁籤 */}
          {!loading && !error && (
            <ul className="nav nav-tabs mb-3">
              {/* 根據用戶數生成相應頁籤 */}
              {userData.map((user, index) => (
                <li key={index} className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === index ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveTab(index);
                    }}
                  >
                    用戶 {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* 若載入完成後沒有錯誤並且成功取得資料，顯示用戶資料卡片 */}
          {!loading && !error && userData.length > 0 && (
            <div className="card">
              <div className="card-body">
                <p className="card-text">
                  Username：{userData[activeTab].username}
                </p>
                <p className="card-text">Email：{userData[activeTab].email}</p>
                <p className="card-text">
                  Redis value：{userData[activeTab].redis_value}
                </p>
              </div>
            </div>
          )}

          {/* 未成功取得用戶資料 */}
          {!loading && !error && userData.length === 0 && (
            <p className="text-center">沒有找到用戶資料</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskFour;
