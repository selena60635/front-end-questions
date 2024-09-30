import React, { useState, useEffect } from "react";

function TaskThree() {
  const [userData, setUserData] = useState([]); // 用戶資料
  const [loading, setLoading] = useState(true); // 載入狀態
  const [error, setError] = useState(""); // 錯誤訊息
  const [sortType, setSortType] = useState(""); // 排序方式

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

        setUserData(res);
      } catch (err) {
        setError("載入失敗，請稍後再試");
      } finally {
        // 關閉載入中訊息
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 根據選擇的排序方式進行a~z排序
  const handleSort = (type) => {
    // 更新排序方式
    setSortType(type);
    const sortedData = [...userData].sort((a, b) => {
      const aValue = a[type].toLowerCase();
      const bValue = b[type].toLowerCase();
      if (aValue < bValue) return -1; //升序
      if (aValue > bValue) return 1; //降序
      return 0;
    });
    // 更新排序後的用戶資料
    setUserData(sortedData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9 mx-auto">
          <h2 className="mb-4">題⽬三：⽤⼾信息排序</h2>

          {/* 載入狀態 */}
          {loading && <p className="mt-3 text-center">載入中...</p>}

          {/* 錯誤訊息 */}
          {error && <p className="mt-3 text-center text-danger">{error}</p>}

          {/*排序方式選擇器*/}
          <div className="mb-3">
            <select
              id="sort"
              className="form-select"
              value={sortType}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="" disabled>
                -- 請選擇排序方式 --
              </option>
              <option value="username">Username</option>
              <option value="email">Email</option>
            </select>
          </div>

          {/* 若載入完成後沒有錯誤並且成功取得資料，顯示用戶資料表格 */}
          {!loading && !error && userData.length > 0 && (
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Redis value</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.redis_value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default TaskThree;
