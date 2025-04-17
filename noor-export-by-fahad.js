(function () {
  "use strict";

  function showMessage(message) {
    if (window.showInstruction)
      window.showInstruction(
        message,
        "ctl00_ibtnCloseInstructionBox",
        "ctl00_lblInstrctionTitle",
        "برمجة خاصة بـ فهد 75",
        "350",
        "170"
      );
    else alert(message);
  }

  function initExportTool() {
    if (!window.location.href.includes("noor.moe.gov.sa")) {
      showMessage("هذه الأداة مخصصة للاستخدام داخل نظام نور فقط");
      return;
    }

    if (typeof window.hideInstructionDialog === "function") {
      window.hideInstructionDialog();
    }

    if (document.querySelector("#custom_export_tool_by_fahad")) return;

    const reportContainer = document.querySelector(".MSRS-RVC");
    const reportWrapper = reportContainer?.parentElement;

    if (!reportContainer || !reportWrapper) {
      showMessage("يرجى فتح التقرير أولاً قبل محاولة التصدير.");
      return;
    }

    const reportId = reportContainer.id;
    const exportBox = document.createElement("div");

    exportBox.id = "custom_export_tool_by_fahad";
    exportBox.style = "padding: 20px; text-align: center; background-color: #f0f0f0; border: 1px solid #ccc; margin-bottom: 10px;";

    ["pdf", "excel", "word"].forEach((format) => {
      const btn = document.createElement("input");
      btn.type = "button";
      btn.className = "btnstyle";
      btn.value = `تصدير ${format.toUpperCase()}`;
      btn.title = `تصدير ${format.toUpperCase()}`;
      btn.style.margin = "0 5px";
      btn.addEventListener("click", () => {
        try {
          window.$find(reportId).exportReport(format === "excel" ? "EXCELOPENXML" : format);
        } catch (err) {
          alert("حدث خطأ أثناء التصدير. تأكد أن التقرير ظاهر.");
        }
      });
      exportBox.appendChild(btn);
    });

    reportWrapper.prepend(exportBox);
  }

  window.MyCustomExportTool = initExportTool;
  initExportTool();
})();
