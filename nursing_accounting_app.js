(function () {
  const data = window.mockupData;

  const state = {
    currentPage: "scope",
    selectedTransactionId: 212,
    selectedOrgName: "행복요양센터",
    transactionFilter: "all"
  };

  const els = {
    pageTitle: document.getElementById("pageTitle"),
    pageDescription: document.getElementById("pageDescription"),
    toast: document.getElementById("toast"),
    scopeGrid: document.getElementById("scopeGrid"),
    screenFlow: document.getElementById("screenFlow"),
    summaryGrid: document.getElementById("summaryGrid"),
    workflowRail: document.getElementById("workflowRail"),
    connectionList: document.getElementById("connectionList"),
    priorityList: document.getElementById("priorityList"),
    lastCollectedAt: document.getElementById("lastCollectedAt"),
    settingsForm: document.getElementById("settingsForm"),
    accountList: document.getElementById("accountList"),
    onboardingChecklist: document.getElementById("onboardingChecklist"),
    statusFilter: document.getElementById("statusFilter"),
    transactionMeta: document.getElementById("transactionMeta"),
    selectionMeta: document.getElementById("selectionMeta"),
    transactionTableBody: document.getElementById("transactionTableBody"),
    transactionInspector: document.getElementById("transactionInspector"),
    voucherStatusLabel: document.getElementById("voucherStatusLabel"),
    voucherHeader: document.getElementById("voucherHeader"),
    voucherLines: document.getElementById("voucherLines"),
    voucherRules: document.getElementById("voucherRules"),
    voucherChecklist: document.getElementById("voucherChecklist"),
    adminListMeta: document.getElementById("adminListMeta"),
    adminOrgTableBody: document.getElementById("adminOrgTableBody"),
    adminInspector: document.getElementById("adminInspector"),
    adminMetrics: document.getElementById("adminMetrics")
  };

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      els.toast.classList.remove("show");
    }, 2200);
  }

  function badgeClass(type) {
    if (type === "good" || type === "정상") return "good";
    if (type === "pending" || type === "주의") return "pending";
    if (type === "info") return "info";
    return "danger";
  }

  function formatAmount(amount, category) {
    return `<span class="amount ${category}">₩ ${amount.toLocaleString("ko-KR")}</span>`;
  }

  function getSelectedTransaction() {
    return data.transactions.find((item) => item.id === state.selectedTransactionId) || data.transactions[0];
  }

  function getSelectedOrg() {
    return data.organizations.find((item) => item.name === state.selectedOrgName) || data.organizations[0];
  }

  function activatePage(page) {
    state.currentPage = page;
    document.querySelectorAll(".page").forEach((pageEl) => {
      pageEl.classList.toggle("hidden", pageEl.dataset.page !== page);
    });
    document.querySelectorAll("[data-page-target]").forEach((button) => {
      button.classList.toggle("active", button.dataset.pageTarget === page);
    });
    els.pageTitle.textContent = data.pageMeta[page].title;
    els.pageDescription.textContent = data.pageMeta[page].description;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderScope() {
    els.scopeGrid.innerHTML = data.featureGroups.map((group) => `
      <article class="panel scope-card">
        <div class="panel-head">
          <div>
            <div class="panel-title">${group.title}</div>
          </div>
          <span class="badge ${badgeClass(group.badge)}">${group.items.length}개</span>
        </div>
        <div class="mini-list">
          ${group.items.map((item) => `<div class="mini-list-item">${item}</div>`).join("")}
        </div>
      </article>
    `).join("");

    els.screenFlow.innerHTML = data.screenFlow.map((item, index) => `
      <article class="chip-card">
        <div class="small">화면 ${index + 1}</div>
        <strong>${item}</strong>
      </article>
    `).join("");
  }

  function renderDashboard() {
    els.summaryGrid.innerHTML = data.summaryCards.map((card) => `
      <article class="summary-card">
        <div class="label">${card.label}</div>
        <div class="value">${card.value}</div>
        <div class="meta">${card.meta}</div>
      </article>
    `).join("");

    els.workflowRail.innerHTML = data.workflow.map((item) => `
      <article class="workflow-card">
        <div class="workflow-step">${item.status === "완료" ? "✓" : item.status === "진행중" ? "!" : "·"}</div>
        <div>
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </div>
        <span class="badge ${badgeClass(item.status === "완료" ? "good" : item.status === "진행중" ? "info" : "pending")}">${item.status}</span>
      </article>
    `).join("");

    els.connectionList.innerHTML = data.connections.map((item) => `
      <article class="connection-card">
        <div class="connection-top">
          <strong>${item.name}</strong>
          <span class="badge ${badgeClass(item.state)}">${item.label}</span>
        </div>
        <p>${item.detail}</p>
      </article>
    `).join("");

    const pending = data.transactions.filter((item) => item.status === "review");
    els.priorityList.innerHTML = pending.map((item) => `
      <article class="priority-item ${item.id === state.selectedTransactionId ? "active" : ""}" data-transaction-id="${item.id}">
        <div class="priority-head">
          <strong>${item.merchant}</strong>
          <span class="badge ${badgeClass("pending")}">${item.statusLabel}</span>
        </div>
        <p>${item.memo}</p>
        <p>${item.date}</p>
      </article>
    `).join("");

    bindTransactionTargets();
  }

  function renderSettings() {
    els.settingsForm.innerHTML = data.settingsForm.map((field) => `
      <div class="field ${field.full ? "full" : ""}">
        <label>${field.label}</label>
        ${field.type === "textarea"
          ? `<textarea>${field.value}</textarea>`
          : `<input value="${field.value}" />`}
      </div>
    `).join("");

    els.accountList.innerHTML = data.connections.map((item) => `
      <article class="account-card">
        <div class="account-top">
          <strong>${item.name}</strong>
          <span class="badge ${badgeClass(item.state)}">${item.label}</span>
        </div>
        <p>${item.detail}</p>
      </article>
    `).join("");

    els.onboardingChecklist.innerHTML = data.onboardingChecklist.map((item) => `
      <article class="check-card">
        <div class="connection-top">
          <strong>${item.title}</strong>
          <span class="badge ${item.done ? "good" : "pending"}">${item.done ? "완료" : "필수"}</span>
        </div>
      </article>
    `).join("");
  }

  function filteredTransactions() {
    if (state.transactionFilter === "all") return data.transactions;
    return data.transactions.filter((item) => item.status === state.transactionFilter);
  }

  function renderTransactions() {
    const items = filteredTransactions();
    els.transactionMeta.textContent = `총 ${items.length}건`;
    els.selectionMeta.textContent = `선택 거래 #${state.selectedTransactionId}`;
    els.transactionTableBody.innerHTML = items.map((item) => `
      <tr class="table-row ${item.id === state.selectedTransactionId ? "active" : ""}" data-transaction-id="${item.id}">
        <td>${item.id}</td>
        <td>${item.date}</td>
        <td>${item.type}</td>
        <td>${item.merchant} / ${item.memo}</td>
        <td>${formatAmount(item.amount, item.category)}</td>
        <td>${item.account}</td>
        <td><span class="badge ${badgeClass(item.status === "review" ? "pending" : item.status === "booked" ? "info" : "good")}">${item.statusLabel}</span></td>
      </tr>
    `).join("");

    bindTransactionTargets();

    const transaction = getSelectedTransaction();
    els.transactionInspector.innerHTML = `
      <div class="detail-grid">
        <div class="field">
          <label>거래번호</label>
          <input value="${transaction.id}" />
        </div>
        <div class="field">
          <label>전표번호</label>
          <input value="${transaction.voucherNo}" />
        </div>
        <div class="field">
          <label>거래처</label>
          <input value="${transaction.merchant}" />
        </div>
        <div class="field">
          <label>계정과목</label>
          <input value="${transaction.account}" />
        </div>
        <div class="field full">
          <label>비고</label>
          <textarea>${transaction.note}</textarea>
        </div>
      </div>
    `;
  }

  function renderVoucher() {
    const transaction = getSelectedTransaction();
    els.voucherStatusLabel.textContent = transaction.status === "booked" ? "전표 생성" : transaction.status === "review" ? "검토 필요" : "확정 가능";
    els.voucherHeader.innerHTML = `
      <div class="voucher-header-grid">
        <div class="field">
          <label>전표번호</label>
          <input value="${transaction.voucherNo}" />
        </div>
        <div class="field">
          <label>전표일자</label>
          <input value="${transaction.date.split(" ")[0]}" />
        </div>
        <div class="field">
          <label>거래유형</label>
          <input value="${transaction.type}" />
        </div>
        <div class="field">
          <label>거래처</label>
          <input value="${transaction.merchant}" />
        </div>
      </div>
    `;
    els.voucherLines.innerHTML = transaction.lines.map((line) => `
      <div class="voucher-line">
        <input value="${line.side}" />
        <input value="${line.desc}" />
        <input value="${line.debit}" />
        <input value="${line.credit}" />
      </div>
    `).join("");
    els.voucherRules.innerHTML = transaction.rules.map((rule) => `
      <article class="rule-card">
        <strong>${rule}</strong>
      </article>
    `).join("");
    els.voucherChecklist.innerHTML = transaction.checklist.map((item) => `
      <article class="check-card">
        <div class="connection-top">
          <strong>${item.label}</strong>
          <span class="badge ${item.done ? "good" : "pending"}">${item.done ? "완료" : "대기"}</span>
        </div>
      </article>
    `).join("");
  }

  function renderAdmin() {
    els.adminListMeta.textContent = `총 ${data.organizations.length}개 기관`;
    els.adminOrgTableBody.innerHTML = data.organizations.map((org) => `
      <tr class="table-row ${org.name === state.selectedOrgName ? "active" : ""}" data-org-name="${org.name}">
        <td>${org.name}</td>
        <td><span class="badge ${badgeClass(org.state === "운영중" ? "good" : "pending")}">${org.state}</span></td>
        <td><span class="badge ${badgeClass(org.service === "정상" ? "good" : "pending")}">${org.service}</span></td>
        <td>${org.login}</td>
      </tr>
    `).join("");

    document.querySelectorAll("[data-org-name]").forEach((row) => {
      row.addEventListener("click", () => {
        state.selectedOrgName = row.dataset.orgName;
        renderAdmin();
        showToast(`${row.dataset.orgName} 기관을 선택했습니다.`);
      });
    });

    const org = getSelectedOrg();
    els.adminInspector.innerHTML = `
      <div class="detail-grid">
        <div class="field">
          <label>기관명</label>
          <input value="${org.name}" />
        </div>
        <div class="field">
          <label>기관 상태</label>
          <input value="${org.state}" />
        </div>
        <div class="field">
          <label>서비스 상태</label>
          <input value="${org.service}" />
        </div>
        <div class="field">
          <label>최근 접속</label>
          <input value="${org.login}" />
        </div>
        <div class="field full">
          <label>사용량 / 실패 현황</label>
          <textarea>${org.usage}\n${org.failures}</textarea>
        </div>
      </div>
    `;

    els.adminMetrics.innerHTML = data.adminMetrics.map((item) => `
      <article class="metric-card">
        <div class="label">${item.label}</div>
        <div class="value">${item.value}</div>
        <div class="meta">${item.meta}</div>
      </article>
    `).join("");
  }

  function bindTransactionTargets() {
    document.querySelectorAll("[data-transaction-id]").forEach((item) => {
      item.addEventListener("click", () => {
        state.selectedTransactionId = Number(item.dataset.transactionId);
        renderDashboard();
        renderTransactions();
        renderVoucher();
      });
    });
  }

  function wireEvents() {
    document.querySelectorAll("[data-page-target]").forEach((button) => {
      button.addEventListener("click", () => activatePage(button.dataset.pageTarget));
    });

    els.statusFilter.innerHTML = `
      <option value="all">전체 상태</option>
      <option value="review">검토 필요</option>
      <option value="ready">확정 가능</option>
      <option value="booked">전표 생성</option>
    `;
    els.statusFilter.addEventListener("change", (event) => {
      state.transactionFilter = event.target.value;
      renderTransactions();
    });

    document.getElementById("collectBtn").addEventListener("click", () => {
      els.lastCollectedAt.textContent = "최근 수집 2026-04-18 10:02";
      showToast("금융기관 API와 카드 API 수집을 실행했습니다.");
    });

    document.getElementById("batchClassifyBtn").addEventListener("click", () => {
      const target = data.transactions.find((item) => item.id === 212);
      target.account = "차량유지비";
      target.status = "ready";
      target.statusLabel = "확정 가능";
      target.note = "차량유지비로 계정과목을 지정했습니다.";
      target.lines[0].side = "차변 / 차량유지비";
      renderDashboard();
      renderTransactions();
      renderVoucher();
      showToast("검토 필요 거래에 자동 분류를 적용했습니다.");
    });

    document.getElementById("openVoucherFromInspectorBtn").addEventListener("click", () => {
      activatePage("vouchers");
      renderVoucher();
      showToast("전표 화면으로 이동했습니다.");
    });

    document.getElementById("saveDraftBtn").addEventListener("click", () => {
      showToast("전표 초안을 저장했습니다.");
    });

    document.getElementById("confirmVoucherBtn").addEventListener("click", () => {
      const transaction = getSelectedTransaction();
      transaction.status = "booked";
      transaction.statusLabel = "전표 생성";
      transaction.checklist = transaction.checklist.map((item) => ({ ...item, done: true }));
      renderDashboard();
      renderTransactions();
      renderVoucher();
      showToast("전표를 확정했습니다.");
    });

    document.getElementById("orgSelectBtn").addEventListener("click", () => {
      showToast("기관 선택은 데모용 버튼입니다.");
    });

    document.getElementById("monthBtn").addEventListener("click", () => {
      showToast("월 변경은 데모용 버튼입니다.");
    });
  }

  function init() {
    renderScope();
    renderDashboard();
    renderSettings();
    renderTransactions();
    renderVoucher();
    renderAdmin();
    wireEvents();
  }

  init();
})();
