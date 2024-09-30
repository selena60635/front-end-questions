import React, { useState } from "react";

function TaskOne() {
  const [userId, setUserId] = useState(""); // 用戶ID
  const [userData, setUserData] = useState(null); // 用戶資料
  const [loading, setLoading] = useState(false); // 載入狀態
  const [error, setError] = useState(""); // 錯誤訊息
  const [showModal, setShowModal] = useState(false); // 控制彈窗顯示狀態

  // 處理提交表單
  const handleSubmit = async (e) => {
    // 取消預設行為
    e.preventDefault();

    // 驗證用戶輸入的ID是否為數字
    if (isNaN(userId) || userId.trim() === "") {
      setError("請輸入數字");
      return;
    }

    // 開始載入，清空錯誤訊息和用戶資料
    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const res = await fetch(`/api/users/${userId}`);

      if (!res.ok) {
        throw new Error("該用戶ID不存在");
      }

      const data = await res.json();
      setUserData(data);
      setShowModal(true);
    } catch (err) {
      setError(
        err.message === "該用戶ID不存在"
          ? "該用戶ID不存在"
          : "請求失敗，請稍後再試"
      );
    } finally {
      // 關閉載入中訊息
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9 mx-auto">
          <h2 className="mb-4">題目一：用戶信息展示（彈窗）</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userId" className="form-label">
                用戶ID：
              </label>
              <input
                type="text"
                id="userId"
                className="form-control"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary " type="submit">
              提交
            </button>
          </form>
          {/* 載入狀態 */}
          {loading && <p className="mt-3 text-center">載入中...</p>}
          {/* 錯誤訊息*/}
          {error && <p className="mt-3 text-center text-danger">{error}</p>}
        </div>
      </div>
      {/* 若彈窗顯示狀態為真並且使用者資料不為空，開啟用戶資料彈窗 */}
      {showModal && userData && (
        <div
          className={`modal fade ${showModal ? "show d-block" : "d-none"}`}
          tabIndex="-1"
          style={showModal ? { display: "block" } : { display: "none" }}
          aria-hidden={!showModal}
        >
          <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">用戶資訊</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
                <p>Redis value: {userData.redis_value}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 若彈窗顯示狀態為真，開啟背景遮罩 */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default TaskOne;
