import{r as x,c as He,j as e,L as P,D as Ue,B as y,C as S,A as W,p as F,h as T,i as B,P as I,k as L,l as D,m as z,n as Ve,o as Me,q as We,s as Qe,t as $e,v as Le,w as Ye,V as $,x as Q,a as Ge}from"./index-DyM2ix-t.js";S.register(W,F,T,B,I,L,D,z);const Je=({filterOverviewData:s})=>{var d,q,A,R,V,M,p,E,u,U,t,h,G,J,K,Z,X,ee,se,ae,te,ie,le,de,ne,re,ce,oe,me,he,xe,be,pe,je,fe,ue,ge,Ne,ve,ye,ke,we,Ce,qe,Re,Ee,Ae,_e,Pe,Se;console.log("Received Filter Overview Data:",s);const[o,i]=x.useState(!1),n=He.getState().user.userInfo;console.log(n);const a=s,m=x.useMemo(()=>{const c=["#FF6B6B","#6BCB77","#4D96FF","#FFD93D","#845EC2","#FF9671","#00C9A7","#C34A36","#FFC75F","#A178DF"];return c[Math.floor(Math.random()*c.length)]},[]),r={labels:((d=a==null?void 0:a.collective_10_days_stats)==null?void 0:d.map(c=>c.date))||[],datasets:[{label:"Calls",data:((q=a==null?void 0:a.collective_10_days_stats)==null?void 0:q.map(c=>c.action_count))||[],borderColor:"#1E90FF",backgroundColor:"#007bff",tension:.4,pointRadius:5,borderWidth:3},{label:"Visits",data:((A=a==null?void 0:a.collective_10_days_stats)==null?void 0:A.map(c=>c.visit_count))||[],borderColor:"#2E8B57",backgroundColor:"#2E8B57",tension:.4,pointRadius:5,borderWidth:3},{label:"Bookings",data:((R=a==null?void 0:a.collective_10_days_stats)==null?void 0:R.map(c=>c.booking_count))||[],borderColor:"#DC143C",backgroundColor:"#DC143C",tension:.4,pointRadius:5,borderWidth:3},{label:"Quotation",data:((V=a==null?void 0:a.collective_10_days_stats)==null?void 0:V.map(c=>c.quotation_count))||[],borderColor:"#EDDB42",backgroundColor:"#EDDB42",tension:.4,pointRadius:5,borderWidth:3}]},j={responsive:!0,plugins:{legend:{position:"top",align:"center"},tooltip:{enabled:!0}},scales:{x:{grid:{color:"#e7e7e7"}},y:{grid:{color:"#e7e7e7"}}}},l=[(M=a==null?void 0:a.enquiry_summary)==null?void 0:M.stage_enquiry,(p=a==null?void 0:a.metrics)==null?void 0:p.total_leads,(E=a==null?void 0:a.enquiry_summary)==null?void 0:E.stage_opportunity],b=[{label:"Enquiry",color:"#00C851",value:`${Math.round(((u=a==null?void 0:a.enquiry_summary)==null?void 0:u.stage_enquiry)/((U=a==null?void 0:a.enquiry_summary)==null?void 0:U.aggregate_enquiries)*100)||0}`,total_value:(t=a==null?void 0:a.enquiry_summary)==null?void 0:t.stage_enquiry},{label:"Lead",color:"#2E3B5F",value:`${Math.round(((h=a==null?void 0:a.enquiry_summary)==null?void 0:h.stage_lead)/((G=a==null?void 0:a.enquiry_summary)==null?void 0:G.aggregate_enquiries)*100)||0}`,total_value:(J=a==null?void 0:a.enquiry_summary)==null?void 0:J.stage_lead},{label:"Opportunity",color:"#FFBB33",value:`${Math.round(((K=a==null?void 0:a.enquiry_summary)==null?void 0:K.stage_opportunity)/((Z=a==null?void 0:a.enquiry_summary)==null?void 0:Z.aggregate_enquiries)*100)||0}`,total_value:(X=a==null?void 0:a.enquiry_summary)==null?void 0:X.stage_opportunity}],k={labels:["Enquiry","Lead","Opportunity"],datasets:[{data:l,backgroundColor:["#00C851","#2E3B5F","#FFBB33"],borderColor:"#fff",borderRadius:10,borderWidth:6,cutout:"70%",circumference:270,rotation:225}]},g={plugins:{legend:{display:!1},tooltip:{enabled:!0,callbacks:{label:function(c){const _=c.label||"",Y=c.formattedValue||"";return`${_}: ${Y}`}}}},cutout:"70%"},N={labels:(ee=a==null?void 0:a.last_10_days_stats)==null?void 0:ee.map(c=>c.date),datasets:[{label:"Calls",data:(se=a==null?void 0:a.last_10_days_stats)==null?void 0:se.map(c=>c.action_count),borderColor:"#1E90FF",backgroundColor:"#007bff",tension:.4,pointRadius:5,borderWidth:3},{label:"Visits",data:(ae=a==null?void 0:a.last_10_days_stats)==null?void 0:ae.map(c=>c.visit_count),borderColor:"#2E8B57",backgroundColor:"#2E8B57",tension:.4,pointRadius:5,borderWidth:3},{label:"Bookings",data:(te=a==null?void 0:a.last_10_days_stats)==null?void 0:te.map(c=>c.booking_count),borderColor:"#DC143C",backgroundColor:"#DC143C",tension:.4,pointRadius:5,borderWidth:3},{label:"Quotation",data:(ie=a==null?void 0:a.last_10_days_stats)==null?void 0:ie.map(c=>c.quotation_count),borderColor:"#EDDB42",backgroundColor:"#EDDB42",tension:.4,pointRadius:5,borderWidth:3}]},v={responsive:!0,plugins:{legend:{position:"top",align:"center"},tooltip:{enabled:!0}},scales:{x:{grid:{color:"#e7e7e7"},ticks:{callback:function(c,_){var Fe,Te,Be,Ie;const Y=(Te=(Fe=a==null?void 0:a.last_10_days_stats)==null?void 0:Fe[_])==null?void 0:Te.date,Oe=(Ie=(Be=a==null?void 0:a.last_10_days_stats)==null?void 0:Be[_])==null?void 0:Ie.project_name;return`${Y}
(${Oe})`}}},y:{grid:{color:"#e7e7e7"}}}},w={labels:[""],datasets:[{label:"Active Calls",data:[(le=a==null?void 0:a.enquiry_summary)==null?void 0:le.total_active_enquiries],backgroundColor:"#4caf50",barPercentage:1,categoryPercentage:1},{label:"New Calls",data:[(de=a==null?void 0:a.enquiry_summary)==null?void 0:de.fresh_enquiries],backgroundColor:"#2196f3",barPercentage:1,categoryPercentage:1},{label:"Non Valid Calls",data:[(re=(ne=a==null?void 0:a.enquiry_summary)==null?void 0:ne.total_dead)==null?void 0:re.total_invalid],backgroundColor:"#ff9800",barPercentage:1,categoryPercentage:1},{label:"Unanswered Calls",data:[0],backgroundColor:"#9c27b0",barPercentage:1,categoryPercentage:1},{label:"Dead Calls",data:[(ce=a==null?void 0:a.enquiry_summary)==null?void 0:ce.total_not_interested],backgroundColor:"#f44336",barPercentage:1,categoryPercentage:1},{label:"Non Active Calls",data:[((oe=a==null?void 0:a.enquiry_summary)==null?void 0:oe.aggregate_enquiries)-((me=a==null?void 0:a.enquiry_summary)==null?void 0:me.total_active_enquiries)],backgroundColor:"#795548",barPercentage:1,categoryPercentage:1}]},C={indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{enabled:!0,callbacks:{label:function(c){const _=c.dataset.label,Y=c.raw;return`${_}: ${Y}`}}}},scales:{x:{stacked:!0,display:!1},y:{stacked:!0,display:!1}}};return e.jsxs("div",{className:"container-fluid p-0 pr-1",children:[e.jsx("style",{children:`
          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes scaleIn {
            from { transform: scale(0.95); }
            to { transform: scale(1); }
          }

          .animate-card {
            animation: fadeIn 0.5s ease-out;
          }

          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
          }

          .btn-outline-primary {
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .btn-outline-primary:hover {
            background-color: #007bff;
            color: #fff;
            transform: scale(1.05);
          }

          .chart-container {
            position: relative;
            transition: transform 0.3s ease;
          }

          .chart-container:hover {
            transform: scale(1.02);
          }

          .stat-card {
            animation: scaleIn 0.4s ease-out;
          }

          .stat-card:hover h4 {
            color: #007bff;
            transition: color 0.3s ease;
          }

          .stat-card:hover h6 {
            color: #FF0000;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .avatar-circle {
            transition: transform 0.3s ease, background-color 0.3s ease;
          }

          .avatar-circle:hover {
            transform: scale(1.1);
            background-color: #007bff !important;
          }

          .status-item {
            transition: background-color 0.3s ease, padding-left 0.3s ease;
          }

          .status-item:hover {
            background-color: #f8f9fa;
            padding-left: 10px;
            border-radius: 5px;
          }

          /* Modal Backdrop Blur */
          .modal.show {
            background: rgba(0, 0, 0, 0.5); /* Semi-transparent dark overlay */
            backdrop-filter: blur(5px); /* Apply blur effect to background */
            -webkit-backdrop-filter: blur(5px); /* For Safari compatibility */
          }

          .modal-content {
            background: #fff; /* Ensure modal content is not blurred */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .card-body {
              padding: 1rem !important;
            }

            .chart-container {
              margin-left: auto !important;
              margin-right: auto !important;
            }

            .doughnut-chart {
              width: 200px !important;
              height: 160px !important;
              margin-left: 1rem !important;
            }

            .status-list {
              width: 80% !important;
            }

            .avatar-circle {
              width: 4rem !important;
              height: 4rem !important;
              font-size: 2rem !important;
            }
          }

          @media (min-width: 992px) {
            .col-lg-5th {
              flex: 0 0 20%;
              max-width: 20%;
            }
          }

          @media (max-width: 576px) {
            .doughnut-chart {
              width: 180px !important;
              height: 140px !important;
            }

            h5 {
              font-size: 1rem !important;
            }

            h4 {
              font-size: 1.25rem !important;
            }

            .status-list {
              width: 100% !important;
            }
          }
        `}),e.jsx("div",{className:"row g-3",children:e.jsxs("div",{className:"col-12 ",children:[e.jsx("div",{className:"card shadow animate-card",style:{height:"8rem",background:"linear-gradient(135deg, #dfe9f3, #ffffff)"},children:e.jsx("div",{className:"card-body p-4",children:e.jsxs("div",{className:"d-flex align-items-center mb-3 justify-content-between",children:[e.jsxs("div",{className:"d-flex align-items-center mb-3 ",children:[e.jsx("div",{className:"avatar-circle d-flex align-items-center justify-content-center rounded-circle text-white fw-bold me-3",style:{width:"4rem",height:"4rem",backgroundColor:m,fontSize:"2.5rem",textAlign:"center"},children:e.jsx("div",{style:{textAlign:"center",padding:"5px",fontSize:"2.5rem"},children:n!=null&&n.employee_name?n.employee_name.charAt(0).toUpperCase():""})}),e.jsxs("div",{children:[e.jsxs("h3",{className:"card-title mt-1",children:[e.jsx("span",{className:"fw-bold",children:"Welcome Back"}),", ",n==null?void 0:n.employee_name]}),e.jsx("p",{children:"Wishing You A Great Day Ahead"})]})]}),e.jsx("div",{className:"text-end",children:e.jsx("button",{className:"btn btn-capsul",style:{color:"white",background:"linear-gradient(135deg, #e1eec5, #f05053)",border:"none"},onClick:()=>i(!0),children:"View Profile"})})]})})}),o&&e.jsx("div",{className:"modal show fade d-block",tabIndex:"-1",role:"dialog",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",role:"document",children:e.jsxs("div",{className:"modal-content p-0 overflow-hidden",style:{borderRadius:"10px"},children:[e.jsxs("div",{className:"d-flex align-items-center p-3",style:{backgroundColor:"#1c1e21",color:"white"},children:[e.jsx("div",{className:"avatar-circle d-flex align-items-center justify-content-center rounded-circle text-white fw-bold me-3",style:{width:"4rem",height:"4rem",backgroundColor:m,fontSize:"2.5rem",textAlign:"center"},children:e.jsx("div",{style:{textAlign:"center",padding:"5px",fontSize:"2.5rem"},children:n!=null&&n.employee_name?n.employee_name.charAt(0).toUpperCase():""})}),e.jsxs("div",{children:[e.jsx("h5",{className:"mb-0",style:{fontSize:"1.5rem",fontWeight:"bold",color:"#ccc"},children:n==null?void 0:n.employee_name}),e.jsx("div",{className:"d-flex align-items-center",style:{fontSize:"0.85rem",color:"#ccc"},children:e.jsx("span",{children:n==null?void 0:n.designation_id})})]}),e.jsx("button",{className:"btn btn-sm ms-auto",onClick:()=>i(!1),style:{background:"transparent",color:"white"},children:"✕"})]}),e.jsxs("div",{className:"p-3",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"text-muted small",children:"Phone Number"}),e.jsx("div",{children:n==null?void 0:n.employee_mobno})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"text-muted small",children:"Email Address"}),e.jsx("div",{children:n==null?void 0:n.email})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"text-muted small",children:"Department"}),e.jsx("div",{children:n==null?void 0:n.department_id})]})]})]})})})]})}),e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card shadow animate-card",children:e.jsx("div",{className:"card-body p-4",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #d0eaff, #ffffff)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Total Products"}),e.jsx("h4",{className:"fw-bold mb-2",children:(he=a==null?void 0:a.metrics)==null?void 0:he.total_projects})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #fff6b7, #fcd9b8)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Total Enquiries"}),e.jsx("h4",{className:"fw-bold mb-2",children:(xe=a==null?void 0:a.enquiry_summary)==null?void 0:xe.total_enquiries})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #fddde6, #e8e6f8)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Active Enquiries"}),e.jsx("h4",{className:"fw-bold mb-2",children:(be=a==null?void 0:a.enquiry_summary)==null?void 0:be.total_active_enquiries})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #d4fc79, #96e6a1)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Not Interested"}),e.jsx("h4",{className:"fw-bold mb-2",children:(pe=a==null?void 0:a.enquiry_summary)==null?void 0:pe.total_not_interested})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #e6f9ec, #ccf6c8)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Invalid Enquiries"}),e.jsx("h4",{className:"fw-bold mb-2",children:(fe=(je=a==null?void 0:a.enquiry_summary)==null?void 0:je.total_dead)==null?void 0:fe.total_invalid})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #d4fcf9, #c2e9fb)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Hot Enquiries"}),e.jsx("h4",{className:"fw-bold mb-2",children:(ue=a==null?void 0:a.enquiry_summary)==null?void 0:ue.hot_count})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #ffe0e0, #ffdadf)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Warm Enquiries"}),e.jsx("h4",{className:"fw-bold mb-2",children:(ge=a==null?void 0:a.enquiry_summary)==null?void 0:ge.warm_count})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #f0f7da, #fffde7)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Cold Enquiries"}),e.jsx("h4",{className:"fw-bold mb-2",children:(Ne=a==null?void 0:a.enquiry_summary)==null?void 0:Ne.cold_count})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #f0f7f4, #d9e4dd)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Fresh Enquiries"}),e.jsx("h4",{className:"fw-bold mb-2",children:(ve=a==null?void 0:a.enquiry_summary)==null?void 0:ve.fresh_enquiries})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #e0c3fc, #8ec5fc)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Total Quotes"}),e.jsx("h4",{className:"fw-bold mb-2",children:(ye=a==null?void 0:a.metrics)==null?void 0:ye.total_quotes})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #84fab0, #8fd3f4)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Total Leads"}),e.jsx("h4",{className:"fw-bold mb-2",children:(ke=a==null?void 0:a.metrics)==null?void 0:ke.total_leads})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #fceabb, #f8b500)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Total Prospects"}),e.jsx("h4",{className:"fw-bold mb-2",children:"95"})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #c2e9fb, #e2ebf0)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Total Schedules"}),e.jsx("h4",{className:"fw-bold mb-2",children:"95"})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #ffdde1, #ee9ca7)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Total Booking"}),e.jsx("h4",{className:"fw-bold mb-2",children:(we=a==null?void 0:a.metrics)==null?void 0:we.total_bookings})]})})}),e.jsx("div",{className:"col-12 col-md-6 col-lg-5th",children:e.jsx("div",{className:"card shadow-sm stat-card h-100",children:e.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center text-center",style:{background:"linear-gradient(135deg, #f4f4f4, #e2e2e2)",color:"white",borderRadius:"0.5rem"},children:[e.jsx("h6",{className:"mb-1",children:"Total Sales"}),e.jsxs("h4",{className:"fw-bold mb-2",children:["₹",(Ce=a==null?void 0:a.metrics)==null?void 0:Ce.total_sales]})]})})})]})})})}),e.jsxs("div",{className:"row g-3 mb-4",children:[e.jsx("div",{className:"col-12 col-lg-9 col-md-6 ",children:e.jsx("div",{className:"card shadow animate-card",children:e.jsxs("div",{className:"card-body p-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{className:"mb-0",children:"Activity Trend"}),e.jsx("button",{className:"btn btn-outline-primary btn-sm",children:"Export"})]}),e.jsx("div",{className:"chart-container",children:e.jsx(P,{data:r,options:j,height:120})})]})})}),e.jsx("div",{className:"col-12 col-lg-3 col-md-6 ",children:e.jsx("div",{className:"card shadow animate-card text-center",children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{className:"mb-0",children:"Enquiry Stages"}),e.jsx("button",{className:"btn btn-outline-primary btn-sm",children:"Export"})]}),e.jsx("div",{className:"doughnut-chart position-relative",style:{width:250,height:220,marginLeft:"1.5rem"},children:e.jsx(Ue,{data:k,options:g})}),e.jsxs("div",{className:"mt-3",children:[e.jsx("h6",{children:"Status"}),e.jsx("div",{className:"d-flex flex-column align-items-center",children:b.map((c,_)=>e.jsxs("div",{className:"d-flex justify-content-between w-50 status-item py-1",children:[e.jsxs("span",{className:"d-flex align-items-center",children:[e.jsx("span",{className:"badge rounded-circle me-2",style:{backgroundColor:c.color,width:10,height:13},children:"."}),c.label," "]}),e.jsx("span",{children:c.total_value}),e.jsxs("span",{children:["(",c.value,")%"]})]},_))})]})]})})})]}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-lg-7 col-md-6",children:e.jsx("div",{className:"card shadow animate-card",children:e.jsxs("div",{className:"card-body p-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("div",{children:e.jsx("h5",{className:"mb-0",children:"Trending Product"})}),e.jsx("button",{className:"btn btn-outline-primary btn-sm",children:"Export"})]}),e.jsx("div",{className:"chart-container",children:e.jsx(y,{data:N,options:v,height:236,width:450})})]})})}),e.jsx("div",{className:"col-12 col-lg-5 col-md-6",children:e.jsx("div",{className:"card shadow animate-card",children:e.jsxs("div",{className:"card-body p-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{className:"mb-0",children:"Enquiry Distribution"}),e.jsx("button",{className:"btn btn-outline-primary btn-sm",children:"Export"})]}),e.jsx("div",{className:"chart-container",style:{height:"20px",borderRadius:"10px",overflow:"hidden"},children:e.jsx(y,{data:w,options:C,height:20})}),e.jsx("div",{className:"row text-center mt-4",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card shadow-sm stat-card h-75",style:{background:"linear-gradient(135deg, #e6f9ec, #ccf6c8)"},children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-1",children:[e.jsx("span",{className:"badge rounded-circle me-2",style:{backgroundColor:"#4caf50",width:"10px",height:"13px"}}),"Active Calls"]}),e.jsx("div",{className:"fw-bold fs-5",children:(qe=a==null?void 0:a.enquiry_summary)==null?void 0:qe.total_active_enquiries})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card shadow-sm stat-card h-75",style:{background:"linear-gradient(135deg, #d0eaff, #ffffff)"},children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-1",children:[e.jsx("span",{className:"badge rounded-circle me-2",style:{backgroundColor:"#2196f3",width:"10px",height:"13px"}}),"New Calls"]}),e.jsx("div",{className:"fw-bold fs-5",children:(Re=a==null?void 0:a.enquiry_summary)==null?void 0:Re.fresh_enquiries})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card shadow-sm stat-card h-75",style:{background:"linear-gradient(135deg, #fff4e6, #ffe0b2)"},children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-1",children:[e.jsx("span",{className:"badge rounded-circle me-2",style:{backgroundColor:"#ff9800",width:"10px",height:"13px"}}),"Non Valid Calls"]}),e.jsx("div",{className:"fw-bold fs-5",children:(Ae=(Ee=a==null?void 0:a.enquiry_summary)==null?void 0:Ee.total_dead)==null?void 0:Ae.total_invalid})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card shadow-sm stat-card h-75",style:{background:"linear-gradient(135deg, #fddde6, #e8e6f8)"},children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-1",children:[e.jsx("span",{className:"badge rounded-circle me-2",style:{backgroundColor:"#9c27b0",width:"10px",height:"13px"}}),"Unanswered Calls"]}),e.jsx("div",{className:"fw-bold fs-5",children:"18"})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card shadow-sm stat-card h-75",style:{background:"linear-gradient(135deg, #fdecea, #fbc9c9)"},children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-1",children:[e.jsx("span",{className:"badge rounded-circle me-2",style:{backgroundColor:"#f44336",width:"10px",height:"13px"}}),"Dead Calls"]}),e.jsx("div",{className:"fw-bold fs-5",children:(_e=a==null?void 0:a.enquiry_summary)==null?void 0:_e.total_not_interested})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card shadow-sm stat-card h-75",style:{background:"linear-gradient(135deg, #d7ccc8, #efebe9)"},children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-1",children:[e.jsx("span",{className:"badge rounded-circle me-2",style:{backgroundColor:"#795548",width:"10px",height:"13px"}}),"Non Active Calls"]}),e.jsx("div",{className:"fw-bold fs-5",children:((Pe=a==null?void 0:a.enquiry_summary)==null?void 0:Pe.aggregate_enquiries)-((Se=a==null?void 0:a.enquiry_summary)==null?void 0:Se.total_active_enquiries)})]})})})]})})})]})})})]})]})};var O={},De;function Ke(){if(De)return O;De=1;var s=Ve();Object.defineProperty(O,"__esModule",{value:!0}),O.default=void 0;var o=s(Me()),i=We();return O.default=(0,o.default)((0,i.jsx)("path",{d:"M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2zm10 14.5V20H8v-3.5l4-4zm-4-5-4-4V4h8v3.5z"}),"HourglassEmpty"),O}var Ze=Ke();const Xe=Qe(Ze);var H={},ze;function es(){if(ze)return H;ze=1;var s=Ve();Object.defineProperty(H,"__esModule",{value:!0}),H.default=void 0;var o=s(Me()),i=We();return H.default=(0,o.default)((0,i.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12m8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8"}),"Block"),H}var ss=es();const as=Qe(ss);S.register(W,F,T,B,I,L,D,z);const ts=()=>{const[s,o]=x.useState([{id:1,name:"John Doe",totalCalls:150,validNumbers:120,invalidNumbers:30,answeredCalls:100,unansweredCalls:20,conversionRate:"83.33%",date:"23-05-2024",source:"Online",product:"CRM",status:"Hot",stage:"Lead",conversionPercent:"70%",rate:4}]),i={labels:["2025-05-01","2025-05-02","2025-05-03","2025-05-04","2025-05-05"],datasets:[{label:"Calls",data:[350,295,310,280,320],borderColor:"#1E90FF",backgroundColor:"#007bff",tension:.4,pointRadius:5,borderWidth:3},{label:"Visits",data:[22,150,25,120,123],borderColor:"#2E8B57",backgroundColor:"#2E8B57",tension:.4,pointRadius:5,borderWidth:3},{label:"Bookings",data:[10,8,129,9,320],borderColor:"#DC143C",backgroundColor:"#DC143C",tension:.4,pointRadius:5,borderWidth:3}]},n={responsive:!0,plugins:{legend:{position:"top",align:"center"},tooltip:{enabled:!0}},scales:{x:{grid:{color:"#e7e7e7"}},y:{grid:{color:"#e7e7e7"}}}};return e.jsxs("div",{className:"container-fluid p-0 pr-1 ",children:[e.jsx("style",{children:`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }

          /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }



          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #52AA56",background:"linear-gradient(135deg, #ffffff, #B6D9B8)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-2",children:[e.jsx($e,{style:{color:"#4caf50",fontSize:20,marginRight:"6px"}}),e.jsx("span",{className:"fw-semibold",children:"Received Calls"})]}),e.jsx("div",{className:"fw-bold fs-4",children:"125"})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #FFA500",background:"linear-gradient(135deg, #ffffff, #FFE5B4)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-2",children:[e.jsx(Xe,{style:{color:"#ff9800",fontSize:20,marginRight:"6px"}}),e.jsx("span",{className:"fw-semibold",children:"No Answer Calls"})]}),e.jsx("div",{className:"fw-bold fs-4",children:"75"})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #DC143C",background:"linear-gradient(135deg, #ffffff, #F4A6A6)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-2",children:[e.jsx(as,{style:{color:"#f44336",fontSize:20,marginRight:"6px"}}),e.jsx("span",{className:"fw-semibold",children:"Invalid No"})]}),e.jsx("div",{className:"fw-bold fs-4",children:"40"})]})})})]}),e.jsxs("div",{className:"row g-3 mb-2",children:[e.jsx("div",{className:"col-12 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card",children:e.jsxs("div",{className:"card-body p-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h6",{className:"mb-0",children:"Calling Statistics"}),e.jsx("button",{className:"btn btn-outline-primary btn-sm",children:"Export"})]}),e.jsx("div",{className:"chart-container",children:e.jsx(y,{data:i,options:n,height:150})})]})})}),e.jsx("div",{className:"col-12 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card",children:e.jsxs("div",{className:"card-body p-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h6",{className:"mb-0",children:"Daily Call Distribution"}),e.jsx("button",{className:"btn btn-outline-primary btn-sm",children:"Export"})]}),e.jsx("div",{className:"chart-container",children:e.jsx(P,{data:i,options:n,height:150})})]})})})]}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold text-light",children:"Calling Data Analysis"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Date"}),e.jsx("th",{scope:"col",children:"Total Calls"}),e.jsx("th",{scope:"col",children:"Valid Numbers"}),e.jsx("th",{scope:"col",children:"Invalid Numbers"}),e.jsx("th",{scope:"col",children:"Answered Calls"}),e.jsx("th",{scope:"col",children:"Unanswered Calls"}),e.jsx("th",{scope:"col",children:"Conversion Rate"})]})}),e.jsx("tbody",{children:s==null?void 0:s.map((a,m)=>e.jsxs("tr",{children:[e.jsx("td",{children:a==null?void 0:a.date}),e.jsx("td",{children:a==null?void 0:a.totalCalls}),e.jsx("td",{children:a==null?void 0:a.validNumbers}),e.jsx("td",{children:a==null?void 0:a.invalidNumbers}),e.jsx("td",{children:a==null?void 0:a.answeredCalls}),e.jsx("td",{children:a==null?void 0:a.unansweredCalls}),e.jsx("td",{children:a==null?void 0:a.conversionRate})]},m))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Employee Stats Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})}),e.jsx("div",{className:"card stats-card animate-card p-4",children:e.jsxs("div",{children:[e.jsx("div",{className:"d-flex justify-content-between align-items-center mb-3",children:e.jsx("h5",{className:"fw-bold",children:"Category Metrics"})}),e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"p-3 card stats-card animate-card h-100 d-flex flex-column",style:{borderTop:"4px solid #FFEB3B",background:"linear-gradient(135deg, #ffffff, #FAF3B9)"},children:[e.jsx("h6",{className:"fw-semibold border-bottom pb-2 mb-3",children:"Assignment"}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"New"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"50"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Old"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"30"})]})]})}),e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"p-3 card stats-card animate-card h-100 d-flex flex-column",style:{borderTop:"4px solid #22C55E",background:"linear-gradient(135deg, #ffffff, #D1FADF)"},children:[e.jsx("h6",{className:"fw-semibold border-bottom pb-2 mb-3",children:"Status"}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Cold"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"20"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Warm"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"40"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Hot"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"20"})]})]})}),e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"p-3 card stats-card animate-card h-100 d-flex flex-column",style:{borderTop:"4px solid #3B82F6",background:"linear-gradient(135deg, #ffffff, #DBEAFE)"},children:[e.jsx("h6",{className:"fw-semibold border-bottom pb-2 mb-3",children:"Activity"}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Enquiry"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"60"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Quote"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"30"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Schedule"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"20"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Sales"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"15"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Dead"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"10"})]})]})}),e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"p-3 card stats-card animate-card h-100 d-flex flex-column",style:{borderTop:"4px solid #828F95",background:"linear-gradient(135deg, #ffffff, #DBDEE0)"},children:[e.jsx("h6",{className:"fw-semibold border-bottom pb-2 mb-3",children:"Stage"}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Enquiry"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"50"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Lead"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"30"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Prospect"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"20"})]})]})}),e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"p-3 card stats-card animate-card h-100 d-flex flex-column",style:{borderTop:"4px solid #A855F7",background:"linear-gradient(135deg, #ffffff, #EDE9FE)"},children:[e.jsx("h6",{className:"fw-semibold border-bottom pb-2 mb-3",children:"Response"}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"In Progress"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"60"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"No Response"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"20"})]})]})}),e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"p-3 card stats-card animate-card h-100 d-flex flex-column",style:{borderTop:"4px solid #EC4899",background:"linear-gradient(135deg, #ffffff, #FCE7F3)"},children:[e.jsx("h6",{className:"fw-semibold border-bottom pb-2 mb-3",children:"Product"}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Product A"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"30"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Product B"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"25"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Product C"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"15"})]})]})}),e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"p-3 card stats-card animate-card h-100 d-flex flex-column",style:{borderTop:"4px solid #10B981",background:"linear-gradient(135deg, #ffffff, #D1FAE5)"},children:[e.jsx("h6",{className:"fw-semibold border-bottom pb-2 mb-3",children:"Conversion"}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"0-25%"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"20"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"26-50%"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"25"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"51-75%"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"20"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"76-100%"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"10"})]})]})}),e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"p-3 card stats-card animate-card h-100 d-flex flex-column",style:{borderTop:"4px solid #F59E0B",background:"linear-gradient(135deg, #ffffff, #FEF3C7)"},children:[e.jsx("h6",{className:"fw-semibold border-bottom pb-2 mb-3",children:"Rate"}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"1"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"20"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"2"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"15"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"3"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"20"})]}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"4"}),e.jsx("span",{className:"badge bg-primary bg-opacity-10 fw-bold px-3 py-1 rounded-pill",children:"30"})]})]})})]})]})}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold text-light",children:"Customer Leads"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Customer"}),e.jsx("th",{scope:"col",children:"Date"}),e.jsx("th",{scope:"col",children:"Source"}),e.jsx("th",{scope:"col",children:"Product"}),e.jsx("th",{scope:"col",children:"Status"}),e.jsx("th",{scope:"col",children:"Stage"}),e.jsx("th",{scope:"col",children:"Conversion (%)"}),e.jsx("th",{scope:"col",children:"Rate"})]})}),e.jsx("tbody",{children:s==null?void 0:s.map((a,m)=>e.jsxs("tr",{children:[e.jsx("td",{children:a==null?void 0:a.name}),e.jsx("td",{children:a==null?void 0:a.date}),e.jsx("td",{children:a==null?void 0:a.source}),e.jsx("td",{children:a==null?void 0:a.product}),e.jsx("td",{children:a==null?void 0:a.status}),e.jsx("td",{children:a==null?void 0:a.stage}),e.jsx("td",{children:a==null?void 0:a.conversionPercent}),e.jsx("td",{children:[...Array(5)].map((r,j)=>e.jsx("span",{className:`mdi ${j<(a==null?void 0:a.rate)?"mdi-star text-warning":"mdi-star-outline text-muted"}`},j))})]},m))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Customer Leads Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})})]})};S.register(W,F,T,B,I,L,D,z);const is=()=>{const[s,o]=x.useState([{id:1,name:"Greenville Apartments",type:"Residential",enquiries:120,visit:30,quotations:100,booking:20,date:"2025-05-15",customerName:"Rajesh Kumar",amount:45e3,stage:"Opportunity",status:"Hot"},{id:2,name:"Jane Smith",type:"Skyline Towers",enquiries:180,visit:20,quotations:160,booking:20,date:"2025-05-14",customerName:"Anita Sharma",amount:32e3,stage:"Lead",status:"Warm"}]),i={labels:["Enquiry","Quote","Schedule","Sales"],datasets:[{label:"Project A",data:[60,30,20,10],backgroundColor:"#007bff",borderColor:"#1E90FF",borderWidth:1},{label:"Project B",data:[50,25,15,18],backgroundColor:"#28a745",borderColor:"#2E8B57",borderWidth:1},{label:"Project C",data:[40,35,25,20],backgroundColor:"#ffc107",borderColor:"#FFA500",borderWidth:1}]},n={responsive:!0,plugins:{legend:{position:"top",align:"center"},tooltip:{enabled:!0}},scales:{x:{grid:{color:"#e7e7e7"},title:{display:!0,text:"Activity Type"}},y:{grid:{color:"#e7e7e7"},title:{display:!0,text:"Count"}}}},[a,m]=x.useState("Enquiry"),r=["Enquiry","Sales","Quote","Schedule"],j=l=>{switch(l==null?void 0:l.toLowerCase()){case"hot":return"bg-danger-subtle text-danger fw-semibold px-3 py-1 rounded-pill";case"warm":return"bg-warning-subtle text-warning fw-semibold px-3 py-1 rounded-pill";case"cold":return"bg-primary-subtle text-primary fw-semibold px-3 py-1 rounded-pill";default:return"bg-secondary-subtle text-secondary fw-semibold px-3 py-1 rounded-pill"}};return e.jsxs("div",{className:"container-fluid p-0 pr-1",children:[e.jsx("style",{children:`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }

          /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }

          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}),e.jsx("div",{className:"row g-3 mb-4",children:e.jsx("div",{className:"col-12 col-md-12",children:e.jsx("div",{className:"card stats-card animate-card",children:e.jsxs("div",{className:"card-body p-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h6",{className:"mb-0",children:"Top Performing Product"}),e.jsx("button",{className:"btn btn-outline-primary btn-sm",children:"Export"})]}),e.jsx("div",{className:"chart-container",children:e.jsx(y,{data:i,options:n,height:80})})]})})})}),e.jsx("div",{className:"d-flex gap-3 mb-4",children:r==null?void 0:r.map(l=>e.jsx("button",{className:`btn ${a===l?"btn-primary":"btn-outline-primary"}`,onClick:()=>m(l),children:l},l))}),a==="Enquiry"&&e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold text-light",children:"Enquiry Details"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Product Name"}),e.jsx("th",{scope:"col",children:"Type"}),e.jsx("th",{scope:"col",children:"Enquiries"}),e.jsx("th",{scope:"col",children:"Visits"}),e.jsx("th",{scope:"col",children:"Quotations"}),e.jsx("th",{scope:"col",children:"Bookings"})]})}),e.jsx("tbody",{children:s==null?void 0:s.map((l,b)=>e.jsxs("tr",{children:[e.jsx("td",{children:b+1}),e.jsx("td",{children:l==null?void 0:l.name}),e.jsx("td",{children:l==null?void 0:l.type}),e.jsx("td",{children:l==null?void 0:l.enquiries}),e.jsx("td",{children:l==null?void 0:l.visit}),e.jsx("td",{children:l==null?void 0:l.quotations}),e.jsx("td",{children:l==null?void 0:l.booking})]},b))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Employee Stats Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})}),a==="Quote"&&e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold text-light",children:"Quote List"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Product Name"}),e.jsx("th",{scope:"col",children:"Latest Date"}),e.jsx("th",{scope:"col",children:"Enquiry Stage"}),e.jsx("th",{scope:"col",children:"Enquiry Status"}),e.jsx("th",{scope:"col",children:"Enquiry Name"}),e.jsx("th",{scope:"col",children:"Quote ID"}),e.jsx("th",{scope:"col",children:"Version"}),e.jsx("th",{scope:"col",children:"Quote Amount"})]})}),e.jsx("tbody",{children:s==null?void 0:s.map((l,b)=>{var f;return e.jsxs("tr",{children:[e.jsx("td",{children:b+1}),e.jsx("td",{children:l==null?void 0:l.name}),e.jsx("td",{children:l==null?void 0:l.date}),e.jsx("td",{children:l==null?void 0:l.stage}),e.jsx("td",{children:e.jsx("span",{className:`badge-pill ${j(l==null?void 0:l.status)}`,children:l==null?void 0:l.status})}),e.jsx("td",{children:l==null?void 0:l.customerName}),e.jsx("td",{children:`QID-${l==null?void 0:l.id}`}),e.jsx("td",{children:`v${(l==null?void 0:l.version)||1}`}),e.jsxs("td",{children:["₹",(f=l==null?void 0:l.amount)==null?void 0:f.toLocaleString()]})]},b)})})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Quote Data Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})}),a==="Schedule"&&e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold text-light",children:"Schedule List"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Product Name"}),e.jsx("th",{scope:"col",children:"Latest Date"}),e.jsx("th",{scope:"col",children:"Enquiry Stage"}),e.jsx("th",{scope:"col",children:"Enquiry Status"}),e.jsx("th",{scope:"col",children:"Enquiry Name"}),e.jsx("th",{scope:"col",children:"Schedule ID"}),e.jsx("th",{scope:"col",children:"Version"}),e.jsx("th",{scope:"col",children:"Status"})]})}),e.jsx("tbody",{children:s==null?void 0:s.map((l,b)=>e.jsxs("tr",{children:[e.jsx("td",{children:b+1}),e.jsx("td",{children:l==null?void 0:l.name}),e.jsx("td",{children:l==null?void 0:l.date}),e.jsx("td",{children:l==null?void 0:l.stage}),e.jsx("td",{children:e.jsx("span",{className:`badge-pill ${j(l==null?void 0:l.status)}`,children:l==null?void 0:l.status})}),e.jsx("td",{children:l==null?void 0:l.customerName}),e.jsx("td",{children:`SID-${l==null?void 0:l.id}`}),e.jsx("td",{children:`v${(l==null?void 0:l.version)||1}`}),e.jsx("td",{children:e.jsx("span",{className:"badge bg-success-subtle text-success fw-semibold px-3 py-1 rounded-pill",children:"Confirmed"})})]},b))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Schedule Data Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})}),a==="Sales"&&e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold text-light",children:"Sales List"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Product Name"}),e.jsx("th",{scope:"col",children:"Date"}),e.jsx("th",{scope:"col",children:"Customer Name"}),e.jsx("th",{scope:"col",children:"Amount"})]})}),e.jsx("tbody",{children:s==null?void 0:s.map((l,b)=>{var f;return e.jsxs("tr",{children:[e.jsx("td",{children:b+1}),e.jsx("td",{children:l==null?void 0:l.name}),e.jsx("td",{children:l==null?void 0:l.date}),e.jsx("td",{children:l==null?void 0:l.customerName}),e.jsxs("td",{children:["₹",(f=l==null?void 0:l.amount)==null?void 0:f.toLocaleString()]})]},b)})})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Product Stats Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})})]})};S.register(W,F,T,B,I,L,D,z);S.register(W,F,T,B,I,L,D,z);const ls=()=>{const[s,o]=x.useState([{id:1,date:"May 16, 2025",enquiryId:"ENQ-2345",name:"John Smith",contact:"+1 (555) 123-4567",product:"Premium Plan",quoteId:"Q-8721",type:"New",time:"10:30 AM",quoteNumber:1,amount:"₹12,500",quoteStatus:"Sent",enquiryStage:"Lead",enquiryStatus:"Warm",conversion:"65%",show:"Viewed",mode:"Email",report:"View"},{id:2,date:"May 16, 2025",enquiryId:"ENQ-2346",name:"Maria Garcia",contact:"+1 (555) 234-5678",product:"Enterprise Solution",quoteId:"Q-8722",type:"New",time:"02:00 PM",quoteNumber:1,amount:"₹45,000",quoteStatus:"Sent",enquiryStage:"Prospect",enquiryStatus:"Hot",conversion:"85%",show:"Viewed",mode:"WhatsApp",report:"View"},{id:3,date:"May 17, 2025",enquiryId:"ENQ-2347",name:"Robert Chen",contact:"+1 (555) 345-6789",product:"Basic Package",quoteId:"Q-8723",type:"Revised",time:"11:15 AM",quoteNumber:2,amount:"₹8,500",quoteStatus:"Prepared",enquiryStage:"Lead",enquiryStatus:"Warm",conversion:"45%",show:"Pending",mode:"Email",report:"View"},{id:4,date:"May 15, 2025",enquiryId:"ENQ-2348",name:"Sarah Johnson",contact:"+1 (555) 456-7890",product:"Premium Plan",quoteId:"Q-8724",type:"Revised",time:"09:00 AM",quoteNumber:3,amount:"₹13,750",quoteStatus:"Sent",enquiryStage:"Prospect",enquiryStatus:"Hot",conversion:"90%",show:"Not Viewed",mode:"Manual",report:"View"}]);return e.jsxs("div",{className:"container-fluid",children:[e.jsx("style",{children:`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }

          /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }
             .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }

          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-lg-4 col-md-6",children:e.jsxs("div",{className:"card shadow-sm p-4 mb-4",children:[e.jsx("h5",{className:"fw-bold mb-3",children:"Total Quotes"}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-lg-6 col-md-6 ",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #3B82F6",background:"linear-gradient(135deg, #ffffff, #DBEAFE)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Number"}),e.jsx("div",{className:"fw-bold fs-5",children:"142"})]})}),e.jsx("div",{className:"col-12 col-lg-6 col-md-6 ",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #10B981",background:"linear-gradient(135deg, #ffffff, #D1FAE5)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Value"}),e.jsx("div",{className:"fw-bold fs-5",children:"₹487,500"})]})})]})]})}),e.jsx("div",{className:"col-12 col-lg-4 col-md-6",children:e.jsxs("div",{className:"card shadow-sm p-4 mb-4",children:[e.jsx("h5",{className:"fw-bold mb-3",children:"New Quotes"}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-lg-6 col-md-6 ",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #3B82F6",background:"linear-gradient(135deg, #ffffff, #DBEAFE)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Number"}),e.jsx("div",{className:"fw-bold fs-5",children:"98"})]})}),e.jsx("div",{className:"col-12 col-lg-6 col-md-6 ",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #10B981",background:"linear-gradient(135deg, #ffffff, #D1FAE5)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Value"}),e.jsx("div",{className:"fw-bold fs-5",children:"₹310,000"})]})})]})]})}),e.jsx("div",{className:"col-12 col-lg-4 col-md-6",children:e.jsxs("div",{className:"card shadow-sm p-4 mb-4",children:[e.jsx("h5",{className:"fw-bold mb-3",children:"Revised Quotes"}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-lg-6 col-md-6 ",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #3B82F6",background:"linear-gradient(135deg, #ffffff, #DBEAFE)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Number"}),e.jsx("div",{className:"fw-bold fs-5",children:"65"})]})}),e.jsx("div",{className:"col-12 col-lg-6 col-md-6 ",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #10B981",background:"linear-gradient(135deg, #ffffff, #D1FAE5)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Value"}),e.jsx("div",{className:"fw-bold fs-5",children:"₹487,700"})]})})]})]})})]}),e.jsx("div",{className:"row g-3",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm",children:e.jsxs("div",{className:"d-flex justify-content-end gap-3 p-3",children:[e.jsxs("div",{className:"mb-3",style:{width:"230px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Product:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"basic",children:"Basic Package"}),e.jsx("option",{value:"standard",children:"Standard Plan"}),e.jsx("option",{value:"premium",children:"Premium Plan"}),e.jsx("option",{value:"enterprise",children:"Enterprise Solution"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"230px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Enquiry Status:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"all",children:"All"}),e.jsx("option",{value:"cold",children:"Cold"}),e.jsx("option",{value:"warm",children:"Warm"}),e.jsx("option",{value:"hot",children:"Hot"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"230px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Quote Type:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"all",children:"All"}),e.jsx("option",{value:"client",children:"New"}),e.jsx("option",{value:"demo",children:"Revised"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"230px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Quote  Status:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"all",children:"All"}),e.jsx("option",{value:"new",children:"Prepared"}),e.jsx("option",{value:"reschedule",children:"Send"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"230px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Mode:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"all",children:"All"}),e.jsx("option",{value:"online",children:"Online"}),e.jsx("option",{value:"offline",children:"Offline"})]})]})]})})})}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0",style:{color:"white",fontWeight:"bold"},children:"Quotation Details"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{children:"SL No."}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Enquiry ID"}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Contact"}),e.jsx("th",{children:"Product"}),e.jsx("th",{children:"Quote ID"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Time"}),e.jsx("th",{children:"Quote #"}),e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Quote Status"}),e.jsx("th",{children:"Enquiry Stage"}),e.jsx("th",{children:"Enquiry Status"}),e.jsx("th",{children:"Conversion"}),e.jsx("th",{children:"Show"}),e.jsx("th",{children:"Mode"}),e.jsx("th",{children:"Report"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:s.map((i,n)=>e.jsxs("tr",{className:"text-nowrap text-center",children:[e.jsx("td",{children:n+1}),e.jsx("td",{children:i.date}),e.jsx("td",{children:i.enquiryId}),e.jsx("td",{children:i.name}),e.jsx("td",{children:i.contact}),e.jsx("td",{children:i.product}),e.jsx("td",{children:i.quoteId}),e.jsx("td",{children:i.type}),e.jsx("td",{children:i.time}),e.jsx("td",{children:i.quoteNumber}),e.jsx("td",{children:i.amount}),e.jsx("td",{children:i.quoteStatus}),e.jsx("td",{children:i.enquiryStage}),e.jsx("td",{children:i.enquiryStatus}),e.jsx("td",{children:i.conversion}),e.jsx("td",{children:i.show}),e.jsx("td",{children:i.mode}),e.jsx("td",{children:e.jsx("a",{href:"#",className:"text-primary",children:"View"})}),e.jsxs("td",{className:"d-flex p-4",children:[e.jsx("button",{className:"action-btn btn-text-primary",title:"View Details",children:e.jsx("i",{className:"mdi mdi-eye text-primary"})}),e.jsx("button",{className:"action-btn btn-text-warning",title:"Edit Company",children:e.jsx("i",{className:"mdi mdi-pencil-outline text-warning"})})]})]},n))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Quotation Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})})]})};S.register(W,F,T,B,I,L,D,z);const ds=()=>{const[s,o]=x.useState([{date:"2025-05-12",enquiryId:"ENQ-001",name:"John Smith",contact:"+1 555-123-4567",product:"Deluxe Package",bookingDate:"2025-06-15",time:"10:00 AM",quoteId:"QT-001",amount:1250,invoice:"INV-001",mode:"Email",payStatus:"Pending"},{date:"2025-05-11",enquiryId:"ENQ-002",name:"Sarah Johnson",contact:"+1 555-987-6543",product:"Standard Package",bookingDate:"2025-06-20",time:"2:30 PM",quoteId:"QT-002",amount:850,invoice:"INV-002",mode:"WhatsApp",payStatus:"Received"},{date:"2025-05-10",enquiryId:"ENQ-003",name:"Michael Chen",contact:"+1 555-456-7890",product:"Premium Package",bookingDate:"2025-06-25",time:"11:00 AM",quoteId:"QT-003",amount:1950,invoice:"INV-003",mode:"Manual",payStatus:"Received"},{date:"2025-05-09",enquiryId:"ENQ-004",name:"Emily Rodriguez",contact:"+1 555-234-5678",product:"Basic Package",bookingDate:"2025-07-05",time:"9:15 AM",quoteId:"QT-004",amount:550,invoice:"INV-004",mode:"Email",payStatus:"Pending"},{date:"2025-05-08",enquiryId:"ENQ-005",name:"David Williams",contact:"+1 555-876-5432",product:"Deluxe Package",bookingDate:"2025-07-10",time:"3:45 PM",quoteId:"QT-005",amount:1250,invoice:"INV-005",mode:"WhatsApp",payStatus:"Pending"}]),i=a=>{const m={Email:"#d0e2ff",WhatsApp:"#d0f0d5",Manual:"#f3d9fa"};return e.jsx(Le,{label:a,size:"small",style:{backgroundColor:m[a]||"#eee",color:"#000",fontWeight:500}})},n=a=>{const m={Pending:"#fff3cd",Received:"#d4edda"};return e.jsx(Le,{label:a,size:"small",style:{backgroundColor:m[a]||"#eee",color:"#000",fontWeight:500}})};return e.jsxs("div",{className:"container-fluid",children:[e.jsx("style",{children:`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }

          /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }

          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}),e.jsx("div",{className:"row g-3 mb-3",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"card shadow-sm px-3 py-3",children:e.jsxs("div",{className:"d-flex align-items-center flex-wrap gap-3",children:[e.jsx("h6",{className:"fw-bold mb-0",children:e.jsx("span",{class:"mdi mdi-filter",children:"Filters:"})}),e.jsx("div",{style:{width:"160px"},children:e.jsx("input",{type:"date",className:"form-control",placeholder:"dd-mm-yyyy"})}),e.jsx("span",{children:"to"}),e.jsx("div",{style:{width:"160px"},children:e.jsx("input",{type:"date",className:"form-control",placeholder:"dd-mm-yyyy"})}),e.jsx("div",{children:e.jsx("button",{className:"btn btn-outline-primary btn-sm",children:"Search "})}),e.jsxs("div",{className:"d-flex",style:{width:"200px"},children:[e.jsx("span",{className:"fw-bold mt-2",children:"Product: "}),e.jsxs("select",{className:"form-select",children:[e.jsx("option",{children:"All"}),e.jsx("option",{children:"Basic Package"}),e.jsx("option",{children:"Standard Plan"}),e.jsx("option",{children:"Premium Plan"}),e.jsx("option",{children:"Enterprise Solution"})]})]}),e.jsx("div",{className:"flex-grow-1",style:{minWidth:"200px"},children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text bg-white",children:e.jsx("span",{class:"mdi mdi-magnify"})}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Search by name or ID..."})]})}),e.jsx("div",{children:e.jsxs("button",{className:"btn btn-outline-primary btn-sm",children:[e.jsx("span",{class:"mdi mdi-refresh"})," Reset"]})})]})})})}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #3B82F6",background:"linear-gradient(135deg, #ffffff, #DBEAFE)"},children:e.jsxs("div",{className:"card-body",children:[e.jsx("div",{className:"d-flex align-items-left mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Total Bookings"})}),e.jsxs("div",{className:"d-flex justify-content-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"fw-bold fs-4 text-dark",children:"5"}),e.jsx("p",{style:{fontSize:"0.8rem"},children:"Bookings"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"fw-bold fs-4 text-success",children:"₹5850.00"}),e.jsx("p",{style:{fontSize:"0.8rem"},children:"Total Value"})]})]})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #CC3333",background:"linear-gradient(135deg, #ffffff, #E4ACAC)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-left mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Pending Payments"})}),e.jsxs("div",{className:"d-flex justify-content-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"fw-bold fs-4 text-danger",children:"3"}),e.jsx("p",{style:{fontSize:"0.8rem"},children:"Bookings"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"fw-bold fs-4 text-danger",children:"₹3050.00"}),e.jsx("p",{style:{fontSize:"0.8rem"},children:"Total Value"})]})]})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #52AA56",background:"linear-gradient(135deg, #ffffff, #B6D9B8)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-left mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Received Payments"})}),e.jsxs("div",{className:"d-flex justify-content-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"fw-bold fs-4 text-success",children:"2"}),e.jsx("p",{style:{fontSize:"0.8rem"},children:"Bookings"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"fw-bold fs-4 text-success",children:"₹2800.00"}),e.jsx("p",{style:{fontSize:"0.8rem"},children:"Total Value"})]})]})]})})})]}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsxs("div",{className:"card-header py-3 d-flex justify-content-between align-items-center",children:[e.jsx("h5",{className:"mb-0 fw-bold",style:{color:"white"},children:"Booking Details"}),e.jsxs("button",{className:"btn btn-outline-primary btn-sm",style:{color:"white"},children:[e.jsx("span",{class:"mdi mdi-download"})," Export"]})]}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-bordered table-hover align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{children:"SL No."}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Enquiry ID"}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Contact"}),e.jsx("th",{children:"Product"}),e.jsx("th",{children:"Booking Date"}),e.jsx("th",{children:"Time"}),e.jsx("th",{children:"Quote ID"}),e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Proforma Invoice"}),e.jsx("th",{children:"Mode"}),e.jsx("th",{children:"Pay Status"})]})}),e.jsx("tbody",{children:s.map((a,m)=>e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("td",{children:m+1}),e.jsx("td",{children:a.date}),e.jsx("td",{className:"fw-bold",children:a.enquiryId}),e.jsx("td",{children:a.name}),e.jsx("td",{children:a.contact}),e.jsx("td",{children:a.product}),e.jsx("td",{children:a.bookingDate}),e.jsx("td",{children:a.time}),e.jsx("td",{children:a.quoteId}),e.jsxs("td",{className:"fw-bold",children:["$",a.amount.toFixed(2)]}),e.jsx("td",{className:"text-primary fw-medium",children:a.invoice}),e.jsx("td",{children:i(a.mode)}),e.jsx("td",{children:n(a.payStatus)})]},m))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Booking Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})})]})};S.register(W,F,T,B,I,L,D,z);const ns=async(s,o)=>{try{const i=await Ye.get("/api/get_dash_overview_data/",{params:{start_date:s,end_date:o}});if(i.status===200)return i.data}catch(i){return console.error("Error fetching overview data:",i),$.error("Failed to fetch overview data"),null}},rs=async(s,o)=>{try{const i=await Ye.get("/api/get_dash_enquiry_data/",{params:{start_date:s,end_date:o}});if(i.status===200)return i.data}catch(i){return console.error("Error fetching enquiry data:",i),$.error("Failed to fetch enquiry data"),null}};S.register(D,L,z,I,B,F,T);const cs=()=>{const[s,o]=x.useState([{id:1,medium:"Online",source:"Facebook",totalEnquiry:150,validEnquiry:120,invalidEnquiry:30,newEnquiry:20,activeEnquiry:50,deadEnquiry:10,noResponseEnquiry:10,lead:80,opportunity:50,quotation:40,schedule:30,sales:25,uploadDate:"2025-05-21",notInterested:5,cold:10,warm:15,hot:20,assign:"Rabi",ownership:"own",number:"57654375734",customerName:"Agst",validation:"valid",response:"In Progress",activity:"Quote",stage:"Lead",status:"Hot",rating:"4.5",conversation:"Xyz"},{id:2,medium:"Offline",source:"Referral",totalEnquiry:100,validEnquiry:90,invalidEnquiry:10,newEnquiry:15,activeEnquiry:40,deadEnquiry:5,noResponseEnquiry:4,lead:60,opportunity:45,quotation:35,schedule:20,sales:15,uploadDate:"2025-05-20",notInterested:3,cold:8,warm:10,hot:12,assign:"Ashis",ownership:"own",number:"57654375734",customerName:"Agst",validation:"valid",response:"In Progress",activity:"Quote",stage:"Lead",status:"Hot",rating:"4.5",conversation:"Xyz"},{id:3,medium:"Online",source:"Instagram",totalEnquiry:80,validEnquiry:70,invalidEnquiry:10,newEnquiry:10,activeEnquiry:30,deadEnquiry:5,noResponseEnquiry:9,lead:60,opportunity:45,quotation:35,schedule:20,sales:15,uploadDate:"2025-05-19",notInterested:2,cold:5,warm:8,hot:10,assign:"Satya",ownership:"own",number:"57654375734",customerName:"Agst",validation:"valid",response:"In Progress",activity:"Quote",stage:"Lead",status:"Hot",rating:"4.5",conversation:"Xyz"}]),[i,n]=x.useState(!0),[a,m]=x.useState("Source Wise Performance"),[r,j]=x.useState("bar"),l=t=>({backgroundColor:r===t?"#5f5dfc":"white",border:"1px solid #5f5dfc",color:r===t?"white":"#5f5dfc",borderRadius:0,padding:"10px 20px",outline:"none",boxShadow:r===t?"0 2px 6px rgba(0,0,0,0.1)":"none"}),b={labels:s.map(t=>t.source),datasets:[{label:"Total Enquiry",data:s.map(t=>t.totalEnquiry),backgroundColor:"#4e73df",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0}},{label:"Valid Enquiry",data:s.map(t=>t.validEnquiry),backgroundColor:"#1cc88a",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0}},{label:"Lead",data:s.map(t=>t.lead),backgroundColor:"#36b9cc",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0}},{label:"Opportunity",data:s.map(t=>t.opportunity),backgroundColor:"#f6c23e",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0}},{label:"Sales",data:s.map(t=>t.sales),backgroundColor:"#e74a3b",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0}}]},f={responsive:!0,plugins:{legend:{position:"top"},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1}},y:{beginAtZero:!0}}},k={labels:s.map(t=>t.source),datasets:[{label:"Sales",data:s.map(t=>t.sales),backgroundColor:["#4e73df","#1cc88a","#36b9cc","#f6c23e","#e74a3b"]}]},g={labels:s.map(t=>t.source),datasets:[{label:"Total Enquiry",data:s.map(t=>t.totalEnquiry),backgroundColor:"#4e73df",borderColor:"#4e73df",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Valid Enquiry",data:s.map(t=>t.validEnquiry),backgroundColor:"#1cc88a",borderColor:"#1cc88a",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Invalid Enquiry",data:s.map(t=>t.invalidEnquiry),backgroundColor:"#e0a800",borderColor:"#e0a800",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"New Enquiry",data:s.map(t=>t.newEnquiry),backgroundColor:"#36b9cc",borderColor:"#36b9cc",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Active Enquiry",data:s.map(t=>t.activeEnquiry),backgroundColor:"#6610f2",borderColor:"#6610f2",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Dead Enquiry",data:s.map(t=>t.deadEnquiry),backgroundColor:"#e74a3b",borderColor:"#e74a3b",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}}]},N={responsive:!0,plugins:{legend:{position:"top"},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1}},y:{beginAtZero:!0}}},v={labels:s.map(t=>t.source),datasets:[{label:"Total Enquiry",data:s.map(t=>t.totalEnquiry),backgroundColor:["#4e73df","#1cc88a","#36b9cc","#f6c23e","#e74a3b","#6610f2","#e0a800"],borderColor:"#fff",borderWidth:1}]},w={labels:s.map(t=>t.source),datasets:[{label:"Total Enquiry",data:s.map(t=>t.totalEnquiry),backgroundColor:"#4e73df",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0},borderColor:"#4e73df"},{label:"Valid Enquiry",data:s.map(t=>t.validEnquiry),backgroundColor:"#1cc88a",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0},borderColor:"#1cc88a"},{label:"Invalid Enquiry",data:s.map(t=>t.invalidEnquiry),backgroundColor:"#e0a800",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0},borderColor:"#e0a800"},{label:"New Enquiry",data:s.map(t=>t.newEnquiry),backgroundColor:"#36b9cc",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0},borderColor:"#36b9cc"},{label:"Active Enquiry",data:s.map(t=>t.activeEnquiry),backgroundColor:"#6610f2",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0},borderColor:"#6610f2"},{label:"Dead Enquiry",data:s.map(t=>t.deadEnquiry),backgroundColor:"#e74a3b",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0},borderColor:"#e74a3b"},{label:"No Response Enquiry",data:s.map(t=>t.noResponseEnquiry),backgroundColor:"#e74a3b",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0},borderColor:"#e74a3b"},{label:"Sales",data:s.map(t=>t.sales),backgroundColor:"#e74a3b",borderRadius:{topLeft:10,topRight:10,bottomLeft:0,bottomRight:0},borderColor:"#e74a3b"}]},C={responsive:!0,plugins:{legend:{position:"top"},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1}},y:{beginAtZero:!0}}},d={labels:s.map(t=>t.source),datasets:[{label:"Sales",data:s.map(t=>t.sales),backgroundColor:["#4e73df","#1cc88a","#36b9cc","#f6c23e","#e74a3b","#6610f2","#e0a800"],borderColor:"#fff",borderWidth:1}]},q={labels:s.map(t=>t.source),datasets:[{label:"Total Enquiry",data:s.map(t=>t.totalEnquiry),backgroundColor:"#4e73df",borderColor:"#4e73df",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Valid Enquiry",data:s.map(t=>t.validEnquiry),backgroundColor:"#1cc88a",borderColor:"#1cc88a",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Quotetion",data:s.map(t=>t.quotation),backgroundColor:"#e0a800",borderColor:"#e0a800",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Schedule",data:s.map(t=>t.schedule),backgroundColor:"#36b9cc",borderColor:"#36b9cc",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Sales",data:s.map(t=>t.sales),backgroundColor:"#6610f2",borderColor:"#6610f2",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Not-Interested",data:s.map(t=>t.notInterested),backgroundColor:"#e74a3b",borderColor:"#e74a3b",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}}]},A={responsive:!0,plugins:{legend:{position:"top"},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1}},y:{beginAtZero:!0}}},R={labels:s.map(t=>t.source),datasets:[{label:"Total Enquiry",data:s.map(t=>t.totalEnquiry),backgroundColor:["#4e73df","#1cc88a","#36b9cc","#f6c23e","#e74a3b","#6610f2","#e0a800"],borderColor:"#fff",borderWidth:1}]},V={labels:s.map(t=>t.source),datasets:[{label:"Total Enquiry",data:s.map(t=>t.totalEnquiry),backgroundColor:"#4e73df",borderColor:"#4e73df",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Active Enquiry",data:s.map(t=>t.activeEnquiry),backgroundColor:"#1cc88a",borderColor:"#1cc88a",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Enquiry Stage",data:s.map(t=>t.quotation),backgroundColor:"#e0a800",borderColor:"#e0a800",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Lead Stage",data:s.map(t=>t.schedule),backgroundColor:"#36b9cc",borderColor:"#36b9cc",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Prospect Stage",data:s.map(t=>t.sales),backgroundColor:"#6610f2",borderColor:"#6610f2",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}}]},M={responsive:!0,plugins:{legend:{position:"top"},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1}},y:{beginAtZero:!0}}},p={labels:s.map(t=>t.source),datasets:[{label:"Total Enquiry",data:s.map(t=>t.totalEnquiry),backgroundColor:["#4e73df","#1cc88a","#36b9cc","#f6c23e","#e74a3b","#6610f2","#e0a800"],borderColor:"#fff",borderWidth:1}]},E={labels:s.map(t=>t.source),datasets:[{label:"Cold",data:s.map(t=>t.cold),backgroundColor:"#e0a800",borderColor:"#e0a800",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Warm",data:s.map(t=>t.warm),backgroundColor:"#36b9cc",borderColor:"#36b9cc",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}},{label:"Hot",data:s.map(t=>t.hot),backgroundColor:"#6610f2",borderColor:"#6610f2",borderRadius:{topLeft:6,topRight:6,bottomLeft:0,bottomRight:0}}]},u={responsive:!0,plugins:{legend:{position:"top"},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1}},y:{beginAtZero:!0}}},U={labels:s.map(t=>t.source),datasets:[{label:"Total Enquiry",data:s.map(t=>t.totalEnquiry),backgroundColor:["#4e73df","#1cc88a","#36b9cc","#f6c23e","#e74a3b","#6610f2","#e0a800"],borderColor:"#fff",borderWidth:1}]};return e.jsxs("div",{className:"container-fluid p-0 pr-1 ",children:[e.jsx("style",{children:`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }
             /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }



          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-lg-3 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #52AA56",background:"linear-gradient(135deg, #ffffff, #B6D9B8)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsxs("span",{className:"fw-semibold",children:[e.jsx("span",{class:"mdi mdi-bookmark"}),"Total Enquiries"]})}),e.jsx("div",{className:"fw-bold fs-4",children:"2,547"})]})})}),e.jsx("div",{className:"col-12 col-lg-3 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #DC143C",background:"linear-gradient(135deg, #ffffff, #F4A6A6)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsxs("span",{className:"fw-semibold",children:[" ",e.jsx("span",{class:"mdi mdi-chart-bar"})," Valid Enquiries"]})}),e.jsx("div",{className:"fw-bold fs-4",children:"1,923"})]})})}),e.jsx("div",{className:"col-12 col-lg-3 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #FFA500",background:"linear-gradient(135deg, #ffffff, #FFE5B4)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsxs("span",{className:"fw-semibold",children:[e.jsx("span",{class:"mdi mdi-chart-pie"}),"Conversion Rate"]})}),e.jsx("div",{className:"fw-bold fs-4",children:"24.8%"})]})})}),e.jsx("div",{className:"col-12 col-lg-3 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #3B82F6",background:"linear-gradient(135deg, #ffffff, #DBEAFE)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsxs("span",{className:"fw-semibold",children:[e.jsx("span",{class:"mdi mdi-sale"}),"Total Sales"]})}),e.jsx("div",{className:"fw-bold fs-4",children:"631"})]})})})]}),e.jsx("div",{className:"row g-3 mb-1  justify-content-between",children:e.jsx("div",{className:"col-12 col-md-6 col-lg-12 ",children:e.jsx("div",{className:"card shadow-sm px-3 py-3",children:e.jsxs("div",{className:"d-flex justify-content-between align-items-center flex-wrap gap-3",children:[e.jsx("div",{style:{width:"200px"},children:e.jsx("input",{type:"date",className:"form-control",placeholder:"dd-mm-yyyy"})}),e.jsx("span",{children:"to"}),e.jsx("div",{style:{width:"200px"},children:e.jsx("input",{type:"date",className:"form-control",placeholder:"dd-mm-yyyy"})}),e.jsx("div",{children:e.jsx("button",{className:"btn btn-outline-primary btn-sm",children:"Search "})}),e.jsxs("div",{className:"d-flex",style:{width:"250px"},children:[e.jsx("span",{className:"fw-bold mt-2",children:"Medium: "}),e.jsxs("select",{className:"form-select",children:[e.jsx("option",{children:"All"}),e.jsx("option",{children:"Social Media"}),e.jsx("option",{children:"Digital"}),e.jsx("option",{children:"Referral"}),e.jsx("option",{children:"Organic"})]})]}),e.jsxs("div",{className:"d-flex",style:{width:"250px"},children:[e.jsx("span",{className:"fw-bold mt-2",children:"Source: "}),e.jsxs("select",{className:"form-select",children:[e.jsx("option",{children:"All"}),e.jsx("option",{children:"Facebook"}),e.jsx("option",{children:"Google Ads"}),e.jsx("option",{children:"Referral"}),e.jsx("option",{children:"Website"})]})]}),e.jsx("div",{children:e.jsxs("button",{className:"btn btn-outline-primary btn-sm",children:[e.jsx("span",{class:"mdi mdi-refresh"})," Reset"]})})]})})})}),e.jsx("div",{children:e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"d-flex justify-content-between p-3",children:[e.jsxs("div",{className:"d-flex",style:{width:"300px"},children:[e.jsx("span",{className:"fw-bold mt-2 me-2 text-nowrap",children:"Report Type:"}),e.jsxs("select",{className:"form-select",value:a,onChange:t=>m(t.target.value),children:[e.jsx("option",{children:"Source Wise Performance"}),e.jsx("option",{children:"Bulk Upload Validation"}),e.jsx("option",{children:"Validation Report"}),e.jsx("option",{children:"Activity Report"}),e.jsx("option",{children:"Stage Wise"}),e.jsx("option",{children:"Status Wise Report"})]})]}),e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"text-end pr-2",children:e.jsxs("div",{className:"rounded overflow-hidden",children:[e.jsx("button",{style:{...l("bar"),borderTopLeftRadius:"12px",borderBottomLeftRadius:"12px"},onClick:()=>j("bar"),children:e.jsx("span",{class:"mdi mdi-chart-bar"})}),e.jsx("button",{style:l("activity"),onClick:()=>j("activity"),children:e.jsx("span",{class:"mdi mdi-chart-line"})}),e.jsx("button",{style:{...l("clock"),borderTopRightRadius:"12px",borderBottomRightRadius:"12px"},onClick:()=>j("clock"),children:e.jsx("span",{class:"mdi mdi-chart-pie"})})]})}),e.jsx("button",{className:"btn btn-sm btn-light ",onClick:()=>n(t=>!t),children:i?"Hide Table":"Show Table"})]})]}),a==="Source Wise Performance"&&e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"py-3 d-flex justify-content-between align-items-center",children:e.jsx("h5",{className:"mb-0 fw-bold ps-3",children:"Source Wise Performance Analysis"})}),e.jsx("div",{className:"card-body ps-4",children:i&&e.jsxs(e.Fragment,{children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Medium"}),e.jsx("th",{scope:"col",children:"Source"}),e.jsx("th",{scope:"col",children:"Total Enquiry"}),e.jsx("th",{scope:"col",children:"Valid Enquiry"}),e.jsx("th",{scope:"col",children:"Lead"}),e.jsx("th",{scope:"col",children:"Opportunity"}),e.jsx("th",{scope:"col",children:"Quote"}),e.jsx("th",{scope:"col",children:"Schedule"}),e.jsx("th",{scope:"col",children:"Sales"})]})}),e.jsx("tbody",{children:s.map((t,h)=>e.jsxs("tr",{children:[e.jsx("td",{children:h+1}),e.jsx("td",{children:t.medium}),e.jsx("td",{children:t.source}),e.jsx("td",{children:t.totalEnquiry}),e.jsx("td",{children:t.validEnquiry}),e.jsx("td",{children:t.lead}),e.jsx("td",{children:t.opportunity}),e.jsx("td",{children:t.quotation}),e.jsx("td",{children:t.schedule}),e.jsx("td",{children:t.sales})]},h))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Report Stats Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})}),e.jsx("div",{className:"p-4 ",children:e.jsxs("div",{className:"card stats-card animate-card shadow-sm",children:[r==="bar"&&e.jsx("div",{className:"p-2",children:e.jsx(y,{data:b,options:f,height:100,width:400})}),r==="activity"&&e.jsx("div",{className:"p-2",children:e.jsx(P,{data:b,options:f,height:100,width:400})}),r==="clock"&&e.jsx("div",{className:"card-body d-flex justify-content-center align-items-center",style:{height:"300px"},children:e.jsx("div",{style:{width:"250px",height:"250px"},children:e.jsx(Q,{data:k})})})]})})]}),a==="Bulk Upload Validation"&&e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"py-3 d-flex justify-content-between align-items-center",children:e.jsx("h5",{className:"mb-0 fw-bold ps-3",children:"Source Wise Bulk upload Enquiry validation"})}),e.jsx("div",{className:"card-body ps-4",children:i&&e.jsxs(e.Fragment,{children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Upload Date"}),e.jsx("th",{scope:"col",children:"Medium"}),e.jsx("th",{scope:"col",children:"Source"}),e.jsx("th",{scope:"col",children:"Total Enquiry"}),e.jsx("th",{scope:"col",children:"Valid Enquiry"}),e.jsx("th",{scope:"col",children:"Invalid Enquiry"}),e.jsx("th",{scope:"col",children:"New Enquiry"}),e.jsx("th",{scope:"col",children:"Active Enquiry"}),e.jsx("th",{scope:"col",children:"Dead Enquiry"})]})}),e.jsx("tbody",{children:s.map((t,h)=>e.jsxs("tr",{children:[e.jsx("td",{children:h+1}),e.jsx("td",{children:t.uploadDate}),e.jsx("td",{children:t.medium}),e.jsx("td",{children:t.source}),e.jsx("td",{children:t.totalEnquiry}),e.jsx("td",{children:t.validEnquiry}),e.jsx("td",{children:t.invalidEnquiry}),e.jsx("td",{children:t.newEnquiry}),e.jsx("td",{children:t.activeEnquiry}),e.jsx("td",{children:t.deadEnquiry})]},h))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Bulk upload Stats Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})}),e.jsx("div",{className:"p-4 ",children:e.jsxs("div",{className:"card stats-card animate-card shadow-sm",children:[r==="bar"&&e.jsx("div",{className:"p-2",children:e.jsx(y,{data:g,options:N,height:100,width:400})}),r==="activity"&&e.jsx("div",{className:"p-2",children:e.jsx(P,{data:g,options:N,height:100,width:400})}),r==="clock"&&e.jsx("div",{className:"card-body d-flex justify-content-center align-items-center",style:{height:"300px"},children:e.jsx("div",{style:{width:"250px",height:"250px"},children:e.jsx(Q,{data:v})})})]})})]}),a==="Validation Report"&&e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"py-3 d-flex justify-content-between align-items-center",children:e.jsx("h5",{className:"mb-0 fw-bold ps-3",children:"Validation wise Enquiry Report"})}),e.jsx("div",{className:"card-body ps-4",children:i&&e.jsxs(e.Fragment,{children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Source"}),e.jsx("th",{scope:"col",children:"Total Enquiry"}),e.jsx("th",{scope:"col",children:"Valid Enquiry"}),e.jsx("th",{scope:"col",children:"Invalid Enquiry"}),e.jsx("th",{scope:"col",children:"Dead Enquiry"}),e.jsx("th",{scope:"col",children:"Active Enquiry"}),e.jsx("th",{scope:"col",children:"No Response Enquiry"}),e.jsx("th",{scope:"col",children:"New Enquiry"}),e.jsx("th",{scope:"col",children:"Sales"})]})}),e.jsx("tbody",{children:s.map((t,h)=>e.jsxs("tr",{children:[e.jsx("td",{children:h+1}),e.jsx("td",{children:t.source}),e.jsx("td",{children:t.totalEnquiry}),e.jsx("td",{children:t.validEnquiry}),e.jsx("td",{children:t.invalidEnquiry}),e.jsx("td",{children:t.deadEnquiry}),e.jsx("td",{children:t.activeEnquiry}),e.jsx("td",{children:t.noResponseEnquiry}),e.jsx("td",{children:t.newEnquiry}),e.jsx("td",{children:t.sales})]},h))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Bulk upload Stats Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})}),e.jsx("div",{className:"p-4 ",children:e.jsxs("div",{className:"card stats-card animate-card shadow-sm",children:[r==="bar"&&e.jsx("div",{className:"p-2",children:e.jsx(y,{data:w,options:C,height:100,width:400})}),r==="activity"&&e.jsx("div",{className:"p-2",children:e.jsx(P,{data:w,options:C,height:100,width:400})}),r==="clock"&&e.jsx("div",{className:"card-body d-flex justify-content-center align-items-center",style:{height:"300px"},children:e.jsx("div",{style:{width:"250px",height:"250px"},children:e.jsx(Q,{data:d})})})]})})]}),a==="Activity Report"&&e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"py-3 d-flex justify-content-between align-items-center",children:e.jsx("h5",{className:"mb-0 fw-bold ps-3",children:"Activity wise Enquiry Report "})}),e.jsx("div",{className:"card-body ps-4",children:i&&e.jsxs(e.Fragment,{children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Upload Date"}),e.jsx("th",{scope:"col",children:"Source"}),e.jsx("th",{scope:"col",children:"Total Enquiry"}),e.jsx("th",{scope:"col",children:"Valid Enquiry"}),e.jsx("th",{scope:"col",children:"New Enquiry"}),e.jsx("th",{scope:"col",children:"Quote"}),e.jsx("th",{scope:"col",children:"Schedule"}),e.jsx("th",{scope:"col",children:"Sales"}),e.jsx("th",{scope:"col",children:"Not-Interested"})]})}),e.jsx("tbody",{children:s.map((t,h)=>e.jsxs("tr",{children:[e.jsx("td",{children:h+1}),e.jsx("td",{children:t.uploadDate}),e.jsx("td",{children:t.source}),e.jsx("td",{children:t.totalEnquiry}),e.jsx("td",{children:t.validEnquiry}),e.jsx("td",{children:t.newEnquiry}),e.jsx("td",{children:t.quotation}),e.jsx("td",{children:t.schedule}),e.jsx("td",{children:t.sales}),e.jsx("td",{children:t.notInterested})]},h))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Activity Report Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})}),e.jsx("div",{className:"p-4 ",children:e.jsxs("div",{className:"card stats-card animate-card shadow-sm",children:[r==="bar"&&e.jsx("div",{className:"p-2",children:e.jsx(y,{data:q,options:A,height:100,width:400})}),r==="activity"&&e.jsx("div",{className:"p-2",children:e.jsx(P,{data:q,options:A,height:100,width:400})}),r==="clock"&&e.jsx("div",{className:"card-body d-flex justify-content-center align-items-center",style:{height:"300px"},children:e.jsx("div",{style:{width:"250px",height:"250px"},children:e.jsx(Q,{data:R})})})]})})]}),a==="Stage Wise"&&e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"py-3 d-flex justify-content-between align-items-center",children:e.jsx("h5",{className:"mb-0 fw-bold ps-3",children:"Enquiry Stage Wise Enquiry Report"})}),e.jsx("div",{className:"card-body ps-4",children:i&&e.jsxs(e.Fragment,{children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Source"}),e.jsx("th",{scope:"col",children:"Total Enquiry"}),e.jsx("th",{scope:"col",children:"Active Enquiry"}),e.jsx("th",{scope:"col",children:"Enquiry Stage"}),e.jsx("th",{scope:"col",children:"Lead Stage"}),e.jsx("th",{scope:"col",children:"Prospect Stage"})]})}),e.jsx("tbody",{children:s.map((t,h)=>e.jsxs("tr",{children:[e.jsx("td",{children:h+1}),e.jsx("td",{children:t.source}),e.jsx("td",{children:t.totalEnquiry}),e.jsx("td",{children:t.activeEnquiry}),e.jsx("td",{children:t.newEnquiry}),e.jsx("td",{children:t.quotation}),e.jsx("td",{children:t.schedule})]},h))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Stage Report Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})}),e.jsx("div",{className:"p-4 ",children:e.jsxs("div",{className:"card stats-card animate-card shadow-sm",children:[r==="bar"&&e.jsx("div",{className:"p-2",children:e.jsx(y,{data:V,options:M,height:100,width:400})}),r==="activity"&&e.jsx("div",{className:"p-2",children:e.jsx(P,{data:V,options:M,height:100,width:400})}),r==="clock"&&e.jsx("div",{className:"card-body d-flex justify-content-center align-items-center",style:{height:"300px"},children:e.jsx("div",{style:{width:"250px",height:"250px"},children:e.jsx(Q,{data:p})})})]})})]}),a==="Status Wise Report"&&e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"py-3 d-flex justify-content-between align-items-center",children:e.jsx("h5",{className:"mb-0 fw-bold ps-3",children:"Enquiry Stage Wise Enquiry Report"})}),e.jsx("div",{className:"card-body ps-4",children:i&&e.jsxs(e.Fragment,{children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Source"}),e.jsx("th",{scope:"col",children:"Total Enquiry"}),e.jsx("th",{scope:"col",children:"Active Enquiry"}),e.jsx("th",{scope:"col",children:"Cold"}),e.jsx("th",{scope:"col",children:"Warm"}),e.jsx("th",{scope:"col",children:"Hot"})]})}),e.jsx("tbody",{children:s.map((t,h)=>e.jsxs("tr",{children:[e.jsx("td",{children:h+1}),e.jsx("td",{children:t.source}),e.jsx("td",{children:t.totalEnquiry}),e.jsx("td",{children:t.activeEnquiry}),e.jsx("td",{children:t.cold}),e.jsx("td",{children:t.warm}),e.jsx("td",{children:t.hot})]},h))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Stage Report Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})}),e.jsx("div",{className:"p-4 ",children:e.jsxs("div",{className:"card stats-card animate-card shadow-sm",children:[r==="bar"&&e.jsx("div",{className:"p-2",children:e.jsx(y,{data:E,options:u,height:100,width:400})}),r==="activity"&&e.jsx("div",{className:"p-2",children:e.jsx(P,{data:E,options:u,height:100,width:400})}),r==="clock"&&e.jsx("div",{className:"card-body d-flex justify-content-center align-items-center",style:{height:"300px"},children:e.jsx("div",{style:{width:"250px",height:"250px"},children:e.jsx(Q,{data:U})})})]})})]})]})}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold text-light",children:"Calling Data Analysis"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle text-nowrap",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"SL No."}),e.jsx("th",{scope:"col",children:"Source"}),e.jsx("th",{scope:"col",children:"Date"}),e.jsx("th",{scope:"col",children:"Assigned Member"}),e.jsx("th",{scope:"col",children:"Ownership"}),e.jsx("th",{scope:"col",children:"Number"}),e.jsx("th",{scope:"col",children:"Customer Name"}),e.jsx("th",{scope:"col",children:"Validation"}),e.jsx("th",{scope:"col",children:"Response"}),e.jsx("th",{scope:"col",children:"Activity"}),e.jsx("th",{scope:"col",children:"Stage"}),e.jsx("th",{scope:"col",children:"Status"}),e.jsx("th",{scope:"col",children:"Rating"}),e.jsx("th",{scope:"col",children:"Last Date"}),e.jsx("th",{scope:"col",children:"Conversation"})]})}),e.jsx("tbody",{children:s==null?void 0:s.map((t,h)=>e.jsxs("tr",{children:[e.jsx("td",{children:h+1}),e.jsx("td",{children:t==null?void 0:t.source}),e.jsx("td",{children:t==null?void 0:t.uploadDate}),e.jsx("td",{children:t==null?void 0:t.assign}),e.jsx("td",{children:t==null?void 0:t.ownership}),e.jsx("td",{children:t==null?void 0:t.number}),e.jsx("td",{children:t==null?void 0:t.customerName}),e.jsx("td",{children:t==null?void 0:t.validation}),e.jsx("td",{children:t==null?void 0:t.response}),e.jsx("td",{children:t==null?void 0:t.activity}),e.jsx("td",{children:t==null?void 0:t.stage}),e.jsx("td",{children:t==null?void 0:t.status}),e.jsx("td",{children:t==null?void 0:t.rating}),e.jsx("td",{children:t==null?void 0:t.uploadDate}),e.jsx("td",{children:t==null?void 0:t.conversation})]},h))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Employee Stats Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})})]})},os=({filterEnquiryData:s})=>{var i,n,a,m,r,j,l,b,f,k,g,N,v,w,C;const o=Ge();return console.log("Received Filter Enquiry Data:",s),e.jsxs("div",{className:"container-fluid p-0 pe-lg-3 ",children:[e.jsx("style",{children:`
          /* Animations from CollectionTab */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes scaleIn {
            from { transform: scale(0.95); }
            to { transform: scale(1); }
          }

          .animate-card {
            animation: fadeIn 0.5s ease-out;
          }

          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 15px;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
          }

          .btn-outline-primary {
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .btn-outline-primary:hover {
            background-color: #007bff;
            color: #fff;
            transform: scale(1.05);
          }

          .chart-container {
            position: relative;
            transition: transform 0.3s ease;
          }

          .chart-container:hover {
            transform: scale(1.02);
          }

          .stat-card {
            animation: scaleIn 0.4s ease-out;
          }

          .stat-card:hover h4 {
            color: #007bff;
            transition: color 0.3s ease;
          }

          .stat-card:hover h6 {
            color: #FF0000;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .avatar-circle {
            transition: transform 0.3s ease, background-color 0.3s ease;
          }

          .avatar-circle:hover {
            transform: scale(1.1);
            background-color: #007bff !important;
          }

          .status-item {
            transition: background-color 0.3s ease, padding-left 0.3s ease;
          }

          .status-item:hover {
            background-color: #f8f9fa;
            padding-left: 10px;
            border-radius: 5px;
          }

         
          .company-info-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .company-info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
          }

          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .table tbody tr {
            transition: background-color 0.2s ease;
          }

          .table tbody tr:hover {
            background-color: #f1f3f5;
          }

          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }

          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }

          .action-btn i {
            font-size: 1.2rem;
          }

          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
          }

          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }

          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }

          /* Responsive Adjustments from CollectionTab */
          @media (max-width: 768px) {
            .card-body {
              padding: 1rem !important;
            }

            .chart-container {
              margin-left: auto !important;
              margin-right: auto !important;
            }

            .doughnut-chart {
              width: 200px !important;
              height: 160px !important;
              margin-left: 1rem !important;
            }

            .status-list {
              width: 80% !important;
            }

            .avatar-circle {
              width: 4rem !important;
              height: 4rem !important;
              font-size: 2rem !important;
            }

            .action-btn {
              width: 32px;
              height: 32px;
            }

            .action-btn i {
              font-size: 1rem;
            }

            .table {
              font-size: 0.9rem;
            }
          }

          @media (min-width: 992px) {
            .col-lg-5th {
              flex: 0 0 20%;
              max-width: 20%;
            }
          }

          .enquiry-status-card:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .enquiry-status-card:hover .fw-bold,
          .enquiry-status-card:hover .fw-semibold {
            color: #333;
          }

          @media (max-width: 576px) {
            .doughnut-chart {
              width: 180px !important;
              height: 140px !important;
            }

            h5 {
              font-size: 1rem !important;
            }

            h4 {
              font-size: 1.25rem !important;
            }

            .status-list {
              width: 100% !important;
            }
          }
        `}),e.jsxs("div",{className:"row g-3 p-2",children:[e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #FFA500",background:"linear-gradient(135deg, #ffffff, #FFE5B4)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Total Enquiries"})}),e.jsx("div",{className:"fw-bold fs-4",children:s==null?void 0:s.total_enquiries})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #DC143C",background:"linear-gradient(135deg, #ffffff, #F4A6A6)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsx("span",{className:"fw-semibold",children:"New Enquiries"})}),e.jsx("div",{className:"fw-bold fs-4",children:s==null?void 0:s.new_enquiries})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #3B82F6",background:"linear-gradient(135deg, #ffffff, #DBEAFE)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Old Enquiries"})}),e.jsx("div",{className:"fw-bold fs-4",children:s==null?void 0:s.old_enquiries})]})})})]}),e.jsxs("div",{className:"row g-3 p-2",children:[e.jsx("div",{className:"col-12 col-lg-6 col-md-6",children:e.jsxs("div",{className:"card shadow-sm p-4 mb-4",children:[e.jsx("h5",{className:"fw-bold mb-3",children:"Enquiry Stage"}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-md-4 ",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #52AA56",background:"linear-gradient(135deg, #ffffff, #B6D9B8)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Enquiry"}),e.jsx("div",{className:"fw-bold fs-5",children:(n=(i=s==null?void 0:s.stage_counts)==null?void 0:i.find(d=>d.stage==="Enquiry FollowUp"))==null?void 0:n.count})]})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #DC3545",background:"linear-gradient(135deg, #ffffff, #FFB3BA)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Lead"}),e.jsx("div",{className:"fw-bold fs-5",children:(m=(a=s==null?void 0:s.stage_counts)==null?void 0:a.find(d=>d.stage==="Lead"))==null?void 0:m.count})]})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #6F42C1",background:"linear-gradient(135deg, #ffffff, #C6B3FF)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Prospect"}),e.jsx("div",{className:"fw-bold fs-5",children:(j=(r=s==null?void 0:s.stage_counts)==null?void 0:r.find(d=>d.stage==="Opportunity"))==null?void 0:j.count})]})})]})]})}),e.jsx("div",{className:"col-12 col-lg-6 col-md-6",children:e.jsxs("div",{className:"card shadow-sm p-4 mb-4",children:[e.jsx("h5",{className:"fw-bold mb-3",children:"Enquiry status"}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-md-4 ",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #FFC107",background:"linear-gradient(135deg, #ffffff, #FFECB3)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Cold"}),e.jsx("div",{className:"fw-bold fs-5",children:(b=(l=s==null?void 0:s.status_counts)==null?void 0:l.find(d=>d.status==="Cold"))==null?void 0:b.count})]})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #117A65",background:"linear-gradient(135deg, #ffffff, #A3E4D7 )"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Hot"}),e.jsx("div",{className:"fw-bold fs-5",children:(k=(f=s==null?void 0:s.status_counts)==null?void 0:f.find(d=>d.status==="Hot"))==null?void 0:k.count})]})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm enquiry-status-card",style:{borderTop:"4px solid #884EA0",background:"linear-gradient(135deg, #ffffff, #D7BDE2  )"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Warm"}),e.jsx("div",{className:"fw-bold fs-5",children:(N=(g=s==null?void 0:s.status_counts)==null?void 0:g.find(d=>d.status==="Warm"))==null?void 0:N.count})]})})]})]})})]}),e.jsx("div",{className:"row p-2",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card company-info-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold",style:{color:"white"},children:"Enquiry Table"})}),e.jsxs("div",{className:"card-body p-4",children:[((v=s==null?void 0:s.visit_details)==null?void 0:v.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Enquiry ID"}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Contact Number"}),e.jsx("th",{children:"Source"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Email"}),e.jsx("th",{children:"Response"}),e.jsx("th",{children:"Stage"}),e.jsx("th",{children:"Rate"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Product"}),e.jsx("th",{children:"Conversion"}),e.jsx("th",{children:"Actions"})]})}),e.jsx("tbody",{className:"text-nowrap",children:(w=s==null?void 0:s.visit_details)==null?void 0:w.map((d,q)=>e.jsxs("tr",{children:[e.jsx("td",{children:new Date(d==null?void 0:d.latest_action_datetime).toISOString().split("T")[0]}),e.jsx("td",{children:d==null?void 0:d.enquiry_id}),e.jsx("td",{children:d==null?void 0:d.customer_name}),e.jsx("td",{children:d==null?void 0:d.customer_phone}),e.jsx("td",{children:(d==null?void 0:d.source)||"Na(Online)"}),e.jsx("td",{children:(d==null?void 0:d.type)||"Na(New/Old)"}),e.jsx("td",{children:d==null?void 0:d.customer_email}),e.jsx("td",{children:(d==null?void 0:d.response)||"Na(In Progress)"}),e.jsx("td",{children:d==null?void 0:d.latest_stage}),e.jsx("td",{children:[...Array(5)].map((A,R)=>e.jsx("span",{className:`mdi ${R<(d==null?void 0:d.rate)?"mdi-star text-warning":"mdi-star-outline text-muted"}`},R))}),e.jsx("td",{children:d==null?void 0:d.latest_status}),e.jsx("td",{children:(d==null?void 0:d.product)||"Na"}),e.jsxs("td",{children:[(d==null?void 0:d.conversion)||"Na","%"]}),e.jsx("td",{className:"d-flex p-4",children:e.jsx("button",{onClick:()=>o("/dashboard/enquiry/enquiryTabView",{state:{enquiryViewData:d}}),className:"action-btn btn-text-primary",title:"View Details",children:e.jsx("i",{className:"mdi mdi-eye text-primary"})})})]},q))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"mdi mdi-alert-circle-outline me-2"}),"No Schedules Found"]}),((C=s==null?void 0:s.visit_details)==null?void 0:C.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s==null?void 0:s.visit_details.length," of ",s==null?void 0:s.visit_details.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})})]})},ms=()=>{const[s,o]=x.useState([{enquiryId:"ENQ001",name:"Greenville Apartments",contact:"9876543210",scheduleType:"Site Visit",mode:"Offline",time:"10:30 AM",scheduleNumber:"SCH123",product:"2BHK Flat",status:"Scheduled",stage:"Initial Discussion",enquiryStatus:"Open",conversion:"50%"},{enquiryId:"ENQ002",name:"Skyline Towers",contact:"9123456789",scheduleType:"Call",mode:"Online",time:"03:00 PM",scheduleNumber:"SCH124",product:"3BHK Flat",status:"Completed",stage:"Site Visit",enquiryStatus:"Closed",conversion:"100%"}]);return e.jsxs("div",{className:"container-fluid",children:[e.jsx("style",{children:`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }
            .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 15px;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
          }
             .status-card:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          }

          .status-card:hover .fw-bold,
          .status-card:hover .fw-semibold {
            color: #333;
          }

          /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }


          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}),e.jsxs("div",{children:[e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-lg-3 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card status-card shadow-sm h-75",style:{borderTop:"4px solid #52AA56",background:"linear-gradient(135deg, #ffffff, #B6D9B8)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Total Schedules"})}),e.jsx("div",{className:"fw-bold fs-4",children:"124"})]})})}),e.jsx("div",{className:"col-12 col-lg-3 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card status-card shadow-sm h-75",style:{borderTop:"4px solid #3B82F6",background:"linear-gradient(135deg, #ffffff, #DBEAFE)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Upcoming"})}),e.jsx("div",{className:"fw-bold fs-4",children:"76"})]})})}),e.jsx("div",{className:"col-12 col-lg-3 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card status-card shadow-sm h-75",style:{borderTop:"4px solid #FFA500",background:"linear-gradient(135deg, #ffffff, #FFE5B4)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Today"})}),e.jsx("div",{className:"fw-bold fs-4",children:"8"})]})})}),e.jsx("div",{className:"col-12 col-lg-3 col-md-6",children:e.jsx("div",{className:"card stats-card animate-card status-card shadow-sm h-75",style:{borderTop:"4px solid #DC143C",background:"linear-gradient(135deg, #ffffff, #F4A6A6)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Past"})}),e.jsx("div",{className:"fw-bold fs-4",children:"40"})]})})})]}),e.jsxs("div",{className:"row g-3 p-2",children:[e.jsx("div",{className:"col-12 col-lg-6 col-md-6",children:e.jsxs("div",{className:"card shadow-sm p-4 mb-4",children:[e.jsx("h5",{className:"fw-bold mb-3",children:"Schedule Status"}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-lg-6 col-md-6",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm status-card",style:{borderTop:"4px solid #DC3545",background:"linear-gradient(135deg, #ffffff, #FFB3BA)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"New"}),e.jsx("div",{className:"fw-bold fs-5",children:"98"})]})}),e.jsx("div",{className:"col-12 col-lg-6 col-md-6",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm status-card",style:{borderTop:"4px solid #6F42C1",background:"linear-gradient(135deg, #ffffff, #C6B3FF)"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Rescheduled"}),e.jsx("div",{className:"fw-bold fs-5",children:"26"})]})})]})]})}),e.jsx("div",{className:"col-12 col-lg-6 col-md-6",children:e.jsxs("div",{className:"card shadow-sm p-4 mb-4",children:[e.jsx("h5",{className:"fw-bold mb-3",children:"Show Status"}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-12 col-lg-6 col-md-6",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm status-card",style:{borderTop:"4px solid #117A65",background:"linear-gradient(135deg, #ffffff, #A3E4D7 )"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"Appeared"}),e.jsx("div",{className:"fw-bold fs-5",children:"68"})]})}),e.jsx("div",{className:"col-12 col-lg-6 col-md-6",children:e.jsxs("div",{className:"rounded p-3 text-center card stats-card animate-card shadow-sm status-card",style:{borderTop:"4px solid #884EA0",background:"linear-gradient(135deg, #ffffff, #D7BDE2  )"},children:[e.jsx("div",{className:"fw-semibold mb-1",children:"No Show"}),e.jsx("div",{className:"fw-bold fs-5",children:"12"})]})})]})]})})]}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-lg-12 col-md-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold",style:{color:"white"},children:"Schedule Table"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap text-center",children:[e.jsx("th",{children:"Enquiry ID"}),e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Contact Number"}),e.jsx("th",{children:"Schedule Type"}),e.jsx("th",{children:"Mode"}),e.jsx("th",{children:"Time"}),e.jsx("th",{children:"Schedule Number"}),e.jsx("th",{children:"Product"}),e.jsx("th",{children:"Schedule Status"}),e.jsx("th",{children:"Enquiry Stage"}),e.jsx("th",{children:"Enquiry Status"}),e.jsx("th",{children:"Conversion"}),e.jsx("th",{children:"Actions"})]})}),e.jsx("tbody",{className:"text-nowrap text-center",children:s.map((i,n)=>e.jsxs("tr",{children:[e.jsx("td",{children:i.enquiryId}),e.jsx("td",{children:i.name}),e.jsx("td",{children:i.contact}),e.jsx("td",{children:i.scheduleType}),e.jsx("td",{children:i.mode}),e.jsx("td",{children:i.time}),e.jsx("td",{children:i.scheduleNumber}),e.jsx("td",{children:i.product}),e.jsx("td",{children:i.status}),e.jsx("td",{children:i.stage}),e.jsx("td",{children:i.enquiryStatus}),e.jsx("td",{children:i.conversion}),e.jsx("td",{className:"d-flex p-4",children:e.jsx("button",{className:"action-btn btn-text-primary",title:"View Details",children:e.jsx("i",{className:"mdi mdi-eye text-primary"})})})]},n))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Schedule Data Found"]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsx("div",{className:"text-muted",children:"Showing 1 to 10 of 10 entries"}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})})]})]})},hs=()=>{const[s,o]=x.useState([{customerId:"CUST001",name:"Ravi Kumar",contact:"9876543210",product:"2BHK Apartment",conversion:"70",stage:"Lead",status:"Active",activity:"Site Visit Scheduled",finalComment:"Interested in next phase launch"},{customerId:"CUST002",name:"Priya Sharma",contact:"9123456789",product:"3BHK Apartment",conversion:"30",stage:"Enquiry",status:"Pending",activity:"Call Done",finalComment:"Asked to follow up next week"}]);return e.jsxs("div",{className:"container-fluid",children:[e.jsx("style",{children:`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }

          /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }

          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold text-light",children:"Buyer Persona Management"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap text-center",children:[e.jsx("th",{scope:"col",style:{width:"60px"},children:"SL No."}),e.jsx("th",{scope:"col",children:"Customer ID"}),e.jsx("th",{scope:"col",children:"Name"}),e.jsx("th",{scope:"col",children:"Contact"}),e.jsx("th",{scope:"col",children:"Product"}),e.jsx("th",{scope:"col",children:"Conversion"}),e.jsx("th",{scope:"col",children:"Enquiry Stage"}),e.jsx("th",{scope:"col",children:"Status / Type"}),e.jsx("th",{scope:"col",children:"Activity"}),e.jsx("th",{scope:"col",children:"Final Comment"})]})}),e.jsx("tbody",{className:"text-nowrap text-center",children:s==null?void 0:s.map((i,n)=>e.jsxs("tr",{children:[e.jsx("td",{children:n+1}),e.jsx("td",{children:i.customerId}),e.jsx("td",{children:i.name}),e.jsx("td",{children:i.contact}),e.jsx("td",{children:i.product}),e.jsx("td",{children:e.jsxs("div",{className:"d-flex align-items-center ",children:[e.jsx("div",{className:"progress rounded-pill w-100",style:{height:"10px",backgroundColor:"#e9ecef"},children:e.jsx("div",{className:"progress-bar",role:"progressbar",style:{width:`${i.conversion}%`,backgroundColor:"#28a745",borderRadius:"10px"},"aria-valuenow":i.conversion,"aria-valuemin":"0","aria-valuemax":"100"})}),e.jsxs("span",{className:"ms-2 fw-semibold",children:[i.conversion,"%"]})]})}),e.jsx("td",{children:i.stage}),e.jsx("td",{children:i.status}),e.jsx("td",{children:i.activity}),e.jsx("td",{children:i.finalComment})]},n))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Employee Stats Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})})]})},xs=()=>{const[s,o]=x.useState([{id:1,date:"23-05-2024",enquiryId:"ENQ123",name:"John Doe",contactNumber:"9876543210",product:"CRM",time:"10:30 AM",bookingId:"BK456",amount:"₹15,000",mode:"WhatsApp",payReceipt:"Generated"},{id:2,date:"24-05-2024",enquiryId:"ENQ123",name:"Jane Smith",contactNumber:"9874563210",product:"CRM",time:"08:30 AM",bookingId:"BK486",amount:"₹15,000",mode:"Email",payReceipt:"Not Generated"}]);return e.jsxs("div",{className:"container-fluid p-0 pr-1 ",children:[e.jsx("style",{children:`
          /* Card Styling */
          .stats-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: fadeIn 0.5s ease-in;
          }
          .stats-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Table Styling */
          .table thead th {
            background-color: #f8f9fa;
            color: #333;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #dee2e6;
          }
          .table tbody tr {
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .table tbody tr:hover {
            background-color: #f1f3f5;
            transform: scale(1.01);
          }

          /* Button Styling */
          .action-btn {
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            margin: 0 4px;
            transition: transform 0.2s ease, background-color 0.2s ease;
          }
          .action-btn:hover {
            transform: scale(1.1);
            background-color: #e9ecef;
          }
          .action-btn i {
            font-size: 1.2rem;
          }
          .add-btn {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            color: white;
            border-radius: 25px;
            padding: 10px 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
          }
          .add-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
            color: white;
          }

          /* Card Header Gradient */
          .card-header {
            background: linear-gradient(90deg, #007bff, #00d4ff);
            border-radius: 15px 15px 0 0;
          }

          /* Pagination Styling */
          .pagination .page-link {
            border-radius: 50%;
            margin: 0 5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
            border: 1px solid #007bff;
          }
          .pagination .page-link:hover {
            transform: scale(1.1);
            background-color: #007bff;
            color: white;
          }
          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
          }

          /* No Data Message */
          .no-data {
            color: #6c757d;
            font-size: 1.5rem;
            animation: fadeIn 1s ease-in;
          }



          /* Chart Card Animation */
          .animate-card {
            animation: slideUp 0.5s ease-in-out;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .animate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          }

          /* Select Dropdown Styling */
          .form-select {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
          }
          .form-select:focus {
            border-color: #007bff;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
            outline: none;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .action-btn {
              width: 32px;
              height: 32px;
            }
            .action-btn i {
              font-size: 1rem;
            }
            .table {
              font-size: 0.85rem;
            }
            .form-select {
              font-size: 0.9rem;
            }
            .chart-container {
              max-width: 100%;
              overflow-x: auto;
            }
            .stats-card, .animate-card {
              margin-bottom: 1rem;
            }
            .form-label {
              font-size: 0.9rem;
            }
            .mb-3 {
              width: 100% !important;
            }
            .d-flex {
              flex-direction: column;
              align-items: stretch;
            }
            .gap-3 {
              gap: 1rem !important;
            }
          }
          @media (max-width: 576px) {
            .table {
              font-size: 0.8rem;
            }
            .no-data {
              font-size: 1.2rem;
            }
            .card-header h5 {
              font-size: 1.1rem;
            }
            .pagination .page-link {
              padding: 0.4rem 0.8rem;
            }
            .btn-sm {
              font-size: 0.8rem;
              padding: 0.3rem 0.6rem;
            }
          }
        `}),e.jsxs("div",{className:"row g-3 justify-content-center",children:[e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #52AA56",background:"linear-gradient(135deg, #ffffff, #B6D9B8)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Total Sales (Count)"})}),e.jsx("div",{className:"fw-bold fs-4",children:"5"})]})})}),e.jsx("div",{className:"col-12 col-md-4",children:e.jsx("div",{className:"card stats-card animate-card shadow-sm h-75",style:{borderTop:"4px solid #DC143C",background:"linear-gradient(135deg, #ffffff, #F4A6A6)"},children:e.jsxs("div",{className:"card-body text-center",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-center mb-2",children:e.jsx("span",{className:"fw-semibold",children:"Total Sales (Value)"})}),e.jsx("div",{className:"fw-bold fs-4",children:"₹5,800"})]})})})]}),e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"card stats-card",children:[e.jsx("div",{className:"card-header py-3",children:e.jsx("h5",{className:"mb-0 fw-bold",style:{color:"white"},children:"Sales Data"})}),e.jsxs("div",{className:"card-body p-4",children:[(s==null?void 0:s.length)>0?e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-bordered align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{scope:"col",children:"Date"}),e.jsx("th",{scope:"col",children:"Enquiry ID"}),e.jsx("th",{scope:"col",children:"Name"}),e.jsx("th",{scope:"col",children:"Contact Number"}),e.jsx("th",{scope:"col",children:"Product"}),e.jsx("th",{scope:"col",children:"Time"}),e.jsx("th",{scope:"col",children:"Booking ID"}),e.jsx("th",{scope:"col",children:"Amount"}),e.jsx("th",{scope:"col",children:"Mode"}),e.jsx("th",{scope:"col",children:"Pay Receipt"}),e.jsx("th",{scope:"col",children:"Actions"})]})}),e.jsx("tbody",{className:"text-nowrap",children:s==null?void 0:s.map((i,n)=>e.jsxs("tr",{children:[e.jsx("td",{children:i==null?void 0:i.date}),e.jsx("td",{children:i==null?void 0:i.enquiryId}),e.jsx("td",{children:i==null?void 0:i.name}),e.jsx("td",{children:i==null?void 0:i.contactNumber}),e.jsx("td",{children:i==null?void 0:i.product}),e.jsx("td",{children:i==null?void 0:i.time}),e.jsx("td",{children:i==null?void 0:i.bookingId}),e.jsx("td",{children:i==null?void 0:i.amount}),e.jsx("td",{children:i==null?void 0:i.mode}),e.jsx("td",{className:(i==null?void 0:i.payReceipt)==="Generated"?"text-success fw-semibold":"text-danger fw-semibold",children:i==null?void 0:i.payReceipt}),e.jsx("td",{className:"d-flex p-4",children:e.jsx("button",{className:"action-btn btn-text-primary",title:"View Details",children:e.jsx("i",{className:"mdi mdi-eye text-primary"})})})]},n))})]})}):e.jsxs("div",{className:"text-center py-5 no-data",children:[e.jsx("i",{className:"bi bi-exclamation-circle me-2"}),"No Enquiry Stats Found"]}),(s==null?void 0:s.length)>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("div",{className:"text-muted",children:["Showing 1 to ",s.length," of ",s.length," entries"]}),e.jsxs("ul",{className:"pagination mb-0",children:[e.jsx("li",{className:"page-item disabled",children:e.jsx("a",{className:"page-link",href:"#",children:"Previous"})}),e.jsx("li",{className:"page-item active",children:e.jsx("a",{className:"page-link",href:"#",children:"1"})}),e.jsx("li",{className:"page-item",children:e.jsx("a",{className:"page-link",href:"#",children:"Next"})})]})]})]})]})})})]})},bs=async(s,o)=>({data:`Overview from ${s} to ${o}`}),ps=async(s,o)=>({data:`Enquiry from ${s} to ${o}`}),fs=()=>{const[s,o]=x.useState("Overview"),[i,n]=x.useState(null),[a,m]=x.useState(""),[r,j]=x.useState(""),[l,b]=x.useState(null),[f,k]=x.useState(""),[g,N]=x.useState(""),v=async(p,E)=>{try{const u=await(ns||bs)(p,E);n(u)}catch(u){console.error("Error fetching OverView data",u)}},w=()=>{a&&r?v(a,r):$.error("Please select both start and end dates")},C=()=>{m(""),j(""),v()},d=async(p,E)=>{try{const u=await(rs||ps)(p,E);b(u)}catch(u){console.error("Error fetching Enquiry Tab data",u)}},q=()=>{f&&g?d(f,g):$.error("Please select both start and end dates")},A=()=>{k(""),N(""),d()};x.useEffect(()=>{v(),d()},[]);const R=()=>{switch(s){case"Overview":return e.jsx(Je,{filterOverviewData:i});case"Source":return e.jsx(cs,{});case"Product":return e.jsx(is,{});case"FollowUp":return e.jsx(ts,{});case"Enquiry":return e.jsx(os,{filterEnquiryData:l});case"Quotations":return e.jsx(ls,{});case"Bookings":return e.jsx(ds,{});case"Buyer Persona":return e.jsx(hs,{});case"Shedules":return e.jsx(ms,{});case"Sales":return e.jsx(xs,{});default:return null}},V=()=>e.jsxs("div",{children:[s==="Overview"&&e.jsxs("div",{className:"d-flex justify-content-end gap-3 pr-2 align-items-end",children:[e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"start_date",className:"form-label fw-bold",children:"Start Date:"}),e.jsx("input",{type:"date",className:"form-control",id:"start_date",name:"start_date",value:a,onChange:p=>m(p.target.value)})]}),e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"end_date",className:"form-label fw-bold",children:"End Date:"}),e.jsx("input",{type:"date",className:"form-control",id:"end_date",name:"end_date",value:r,onChange:p=>j(p.target.value)})]}),e.jsxs("div",{className:"mb-3 d-flex gap-2",children:[e.jsx("button",{className:"btn btn-primary",onClick:w,children:"Search"}),e.jsx("div",{children:e.jsx("button",{className:"btn btn-light",onClick:C,children:"Reset"})})]})]}),s==="FollowUp"&&e.jsx("div",{className:"row g-3 mb-4",children:e.jsxs("div",{className:"d-flex justify-content-end gap-3 pr-2",children:[e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Date Range:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"daily",children:"Daily"}),e.jsx("option",{value:"weekly",children:"Weekly"}),e.jsx("option",{value:"monthly",children:"Monthly"}),e.jsx("option",{value:"quarterly",children:"Quarterly"}),e.jsx("option",{value:"annually",children:"Annually"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"employee",className:"form-label fw-bold",children:"Employee:"}),e.jsxs("select",{className:"form-select",id:"employee",children:[e.jsx("option",{value:"raj",children:"Raj Tripathy"}),e.jsx("option",{value:"abhishek",children:"Abhishek Rathi"}),e.jsx("option",{value:"rahul",children:"Rahul Pani"}),e.jsx("option",{value:"pradip",children:"Pradip Sutar"}),e.jsx("option",{value:"amit",children:"Amit Das"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"dataSource",className:"form-label fw-bold",children:"Data Source:"}),e.jsxs("select",{className:"form-select",id:"dataSource",children:[e.jsx("option",{value:"website",children:"Website"}),e.jsx("option",{value:"newspaper",children:"Newspaper"}),e.jsx("option",{value:"referrals",children:"Referrals"}),e.jsx("option",{value:"social",children:"Social Media"})]})]})]})}),s==="Product"&&e.jsx("div",{className:"row g-3 mb-4",children:e.jsx("div",{className:"d-flex justify-content-end gap-3 pr-2",children:e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Date Range:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"daily",children:"Daily"}),e.jsx("option",{value:"weekly",children:"Weekly"}),e.jsx("option",{value:"monthly",children:"Monthly"}),e.jsx("option",{value:"quarterly",children:"Quarterly"}),e.jsx("option",{value:"annually",children:"Annually"})]})]})})}),s==="Buyer Persona"&&e.jsx("div",{className:"row g-3 mb-4",children:e.jsxs("div",{className:"d-flex justify-content-end gap-3 pr-2",children:[e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Date Range:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"daily",children:"Daily"}),e.jsx("option",{value:"weekly",children:"Weekly"}),e.jsx("option",{value:"monthly",children:"Monthly"}),e.jsx("option",{value:"quarterly",children:"Quarterly"}),e.jsx("option",{value:"annually",children:"Annually"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"employee",className:"form-label fw-bold",children:"Employee:"}),e.jsxs("select",{className:"form-select",id:"employee",children:[e.jsx("option",{value:"raj",children:"Raj Tripathy"}),e.jsx("option",{value:"abhishek",children:"Abhishek Rathi"}),e.jsx("option",{value:"rahul",children:"Rahul Pani"}),e.jsx("option",{value:"pradip",children:"Pradip Sutar"}),e.jsx("option",{value:"amit",children:"Amit Das"})]})]})]})}),s==="Shedules"&&e.jsx("div",{className:"row g-3 mb-4",children:e.jsxs("div",{className:"d-flex justify-content-end gap-3 pr-2",children:[e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Date Range:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"daily",children:"Daily"}),e.jsx("option",{value:"weekly",children:"Weekly"}),e.jsx("option",{value:"monthly",children:"Monthly"}),e.jsx("option",{value:"quarterly",children:"Quarterly"}),e.jsx("option",{value:"annually",children:"Annually"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"employee",className:"form-label fw-bold",children:"Employee:"}),e.jsxs("select",{className:"form-select",id:"employee",children:[e.jsx("option",{value:"raj",children:"Raj Tripathy"}),e.jsx("option",{value:"abhishek",children:"Abhishek Rathi"}),e.jsx("option",{value:"rahul",children:"Rahul Pani"}),e.jsx("option",{value:"pradip",children:"Pradip Sutar"}),e.jsx("option",{value:"amit",children:"Amit Das"})]})]})]})}),s==="Quotations"&&e.jsx("div",{className:"row g-3 mb-4",children:e.jsxs("div",{className:"d-flex justify-content-end gap-3 pr-2",children:[e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Date Range:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"daily",children:"Daily"}),e.jsx("option",{value:"weekly",children:"Weekly"}),e.jsx("option",{value:"monthly",children:"Monthly"}),e.jsx("option",{value:"quarterly",children:"Quarterly"}),e.jsx("option",{value:"annually",children:"Annually"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"employee",className:"form-label fw-bold",children:"Employee:"}),e.jsxs("select",{className:"form-select",id:"employee",children:[e.jsx("option",{value:"raj",children:"Raj Tripathy"}),e.jsx("option",{value:"abhishek",children:"Abhishek Rathi"}),e.jsx("option",{value:"rahul",children:"Rahul Pani"}),e.jsx("option",{value:"pradip",children:"Pradip Sutar"}),e.jsx("option",{value:"amit",children:"Amit Das"})]})]})]})}),s==="Bookings"&&e.jsx("div",{className:"row g-3 mb-4",children:e.jsxs("div",{className:"d-flex justify-content-end gap-3 pr-2",children:[e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"timePeriod",className:"form-label fw-bold",children:"Date Range:"}),e.jsxs("select",{className:"form-select",id:"timePeriod",children:[e.jsx("option",{value:"daily",children:"Daily"}),e.jsx("option",{value:"weekly",children:"Weekly"}),e.jsx("option",{value:"monthly",children:"Monthly"}),e.jsx("option",{value:"quarterly",children:"Quarterly"}),e.jsx("option",{value:"annually",children:"Annually"})]})]}),e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"employee",className:"form-label fw-bold",children:"Employee:"}),e.jsxs("select",{className:"form-select",id:"employee",children:[e.jsx("option",{value:"raj",children:"Raj Tripathy"}),e.jsx("option",{value:"abhishek",children:"Abhishek Rathi"}),e.jsx("option",{value:"rahul",children:"Rahul Pani"}),e.jsx("option",{value:"pradip",children:"Pradip Sutar"}),e.jsx("option",{value:"amit",children:"Amit Das"})]})]})]})}),s==="Enquiry"&&e.jsxs("div",{className:"d-flex justify-content-end gap-3 pr-2 align-items-end",children:[e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"start_date",className:"form-label fw-bold",children:"Start Date:"}),e.jsx("input",{type:"date",className:"form-control",id:"start_date",name:"start_date",value:f,onChange:p=>k(p.target.value)})]}),e.jsxs("div",{className:"mb-3",style:{width:"200px"},children:[e.jsx("label",{htmlFor:"end_date",className:"form-label fw-bold",children:"End Date:"}),e.jsx("input",{type:"date",className:"form-control",id:"end_date",name:"end_date",value:g,onChange:p=>N(p.target.value)})]}),e.jsxs("div",{className:"mb-3 d-flex gap-2",children:[e.jsx("button",{className:"btn btn-primary",onClick:q,children:"Search"}),e.jsx("div",{children:e.jsx("button",{className:"btn btn-light",onClick:A,children:"Reset"})})]})]})]}),M=["Overview","Source","Product","FollowUp","Enquiry","Shedules","Quotations","Bookings","Sales","Buyer Persona"];return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
          .custom-nav-button {
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.2s ease-in-out;
            margin-right: 8px;
            background-color: #f8f9fa;
            border: 2px solid #007bff;
            color: #007bff;
          }
          .custom-nav-button:hover {
            background-color: #e9ecef;
            border-color: #0056b3;
            color: #0056b3;
          }
          .custom-nav-button.active {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
          }
          .custom-nav-button:focus {
            box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
            outline: none;
          }
        `}),e.jsxs("div",{className:"container-fluid p-0 ps-lg-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsx("h5",{className:"fw-light ms-0 ms-md-4 text-nowrap",children:"Admin Dashboard"}),e.jsx("div",{className:"flex-grow-1 d-flex justify-content-end",children:V()})]}),e.jsx("div",{className:"container-fluid p-0 ps-lg-4 mt-3",children:e.jsx("div",{className:"d-flex justify-content-between flex-nowrap overflow-auto",style:{whiteSpace:"nowrap",gap:"0.5rem"},children:M.map(p=>e.jsx("button",{className:`custom-nav-button ${s===p?"active":""}`,onClick:()=>o(p),children:p},p))})}),e.jsx("div",{className:"container-fluid p-0 ps-lg-4 mt-4",children:R()})]})]})};export{fs as default};
