import React, {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

const Settings = () => {

  const [currency, setCurrency] =
    useState("INR");

  const [theme, setTheme] =
    useState("light");

  // GET SETTINGS
  const getSettings = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/setting",
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      setCurrency(
        data.settings.currency
      );

      setTheme(
        data.settings.theme
      );

    } catch (error) {

      console.log(error);
    }
  };

  // UPDATE SETTINGS
  const updateSettings =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            "http://localhost:8080/api/setting",
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                currency,
                theme,
              }),
            }
          );

        const data =
          await response.json();

        alert(data.message);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <AdminLayout>

      <div className="w-full min-h-screen bg-gray-100 p-6">

        {/* PAGE HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage application settings
          </p>

        </div>

        {/* SETTINGS CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">

          <form
            onSubmit={updateSettings}
            className="space-y-6"
          >

            {/* CURRENCY */}
            <div>

              <label className="block text-lg font-medium text-gray-700 mb-2">
                Currency
              </label>

              <select
                value={currency}
                onChange={(e) =>
                  setCurrency(
                    e.target.value
                  )
                }
                className="w-full border h-[50px] px-4 rounded-xl outline-none"
              >

                <option value="INR">
                  ₹ INR
                </option>

                <option value="USD">
                  $ USD
                </option>

                <option value="EUR">
                  € EUR
                </option>

              </select>

            </div>

            {/* THEME */}
            <div>

              <label className="block text-lg font-medium text-gray-700 mb-2">
                Theme
              </label>

              <select
                value={theme}
                onChange={(e) =>
                  setTheme(
                    e.target.value
                  )
                }
                className="w-full border h-[50px] px-4 rounded-xl outline-none"
              >

                <option value="light">
                  Light
                </option>

                <option value="dark">
                  Dark
                </option>

              </select>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white w-full h-[55px] rounded-xl text-lg font-semibold transition"
            >
              Save Settings
            </button>

          </form>

        </div>

      </div>

    </AdminLayout>
  );
};

export default Settings;