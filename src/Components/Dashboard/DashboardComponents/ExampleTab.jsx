import { useState } from 'react';
import { LineChart, BarChart, PieChart as RechartsPieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ChevronDown, Filter, Download, Search, RefreshCw, BarChart3, PieChart, Activity, Layers } from 'lucide-react';

// Sample data for demonstration
const sourceWisePerformanceData = [
    { medium: 'Social Media', source: 'Facebook', totalEnquiry: 240, validEnquiry: 200, lead: 150, opportunity: 100, quote: 80, schedule: 60, sales: 40 },
    { medium: 'Social Media', source: 'Instagram', totalEnquiry: 180, validEnquiry: 150, lead: 120, opportunity: 90, quote: 70, schedule: 50, sales: 35 },
    { medium: 'Digital', source: 'Google Ads', totalEnquiry: 320, validEnquiry: 280, lead: 220, opportunity: 180, quote: 150, schedule: 100, sales: 80 },
    { medium: 'Referral', source: 'Client Referral', totalEnquiry: 150, validEnquiry: 140, lead: 120, opportunity: 100, quote: 80, schedule: 60, sales: 50 },
    { medium: 'Organic', source: 'Website', totalEnquiry: 200, validEnquiry: 180, lead: 120, opportunity: 90, quote: 70, schedule: 50, sales: 30 },
];

const bulkUploadData = [
    { uploadDate: '2025-05-01', medium: 'Social Media', source: 'Facebook', totalData: 500, validData: 450, invalidData: 50, newData: 400, activeData: 350, deadData: 100 },
    { uploadDate: '2025-05-02', medium: 'Digital', source: 'Google Ads', totalData: 600, validData: 520, invalidData: 80, newData: 500, activeData: 450, deadData: 70 },
    { uploadDate: '2025-05-03', medium: 'Referral', source: 'Client Referral', totalData: 300, validData: 280, invalidData: 20, newData: 250, activeData: 230, deadData: 50 },
    { uploadDate: '2025-05-04', medium: 'Social Media', source: 'Instagram', totalData: 400, validData: 350, invalidData: 50, newData: 320, activeData: 280, deadData: 80 },
    { uploadDate: '2025-05-05', medium: 'Organic', source: 'Website', totalData: 350, validData: 320, invalidData: 30, newData: 300, activeData: 270, deadData: 50 },
];

const validationWiseData = [
    { source: 'Facebook', totalEnquiry: 500, validEnquiry: 450, invalidEnquiry: 50, deadEnquiry: 30, activeEnquiry: 420, noResponseEnquiry: 100, newEnquiry: 320, sales: 80 },
    { source: 'Instagram', totalEnquiry: 400, validEnquiry: 350, invalidEnquiry: 50, deadEnquiry: 40, activeEnquiry: 310, noResponseEnquiry: 80, newEnquiry: 270, sales: 60 },
    { source: 'Google Ads', totalEnquiry: 600, validEnquiry: 530, invalidEnquiry: 70, deadEnquiry: 50, activeEnquiry: 480, noResponseEnquiry: 120, newEnquiry: 410, sales: 90 },
    { source: 'Client Referral', totalEnquiry: 300, validEnquiry: 280, invalidEnquiry: 20, deadEnquiry: 15, activeEnquiry: 265, noResponseEnquiry: 40, newEnquiry: 240, sales: 70 },
    { source: 'Website', totalEnquiry: 450, validEnquiry: 400, invalidEnquiry: 50, deadEnquiry: 35, activeEnquiry: 365, noResponseEnquiry: 90, newEnquiry: 310, sales: 75 },
];

const activityWiseData = [
    { source: 'Facebook', totalEnquiry: 500, validEnquiry: 450, enquiry: 400, quote: 200, schedule: 150, sales: 80, notInterested: 120 },
    { source: 'Instagram', totalEnquiry: 400, validEnquiry: 350, enquiry: 320, quote: 180, schedule: 120, sales: 60, notInterested: 90 },
    { source: 'Google Ads', totalEnquiry: 600, validEnquiry: 530, enquiry: 480, quote: 300, schedule: 200, sales: 120, notInterested: 110 },
    { source: 'Client Referral', totalEnquiry: 300, validEnquiry: 280, enquiry: 260, quote: 200, schedule: 150, sales: 80, notInterested: 50 },
    { source: 'Website', totalEnquiry: 450, validEnquiry: 400, enquiry: 350, quote: 220, schedule: 180, sales: 90, notInterested: 80 },
];

const stageWiseData = [
    { source: 'Facebook', totalEnquiry: 500, activeEnquiry: 420, enquiryStage: 200, leadStage: 150, prospectStage: 70 },
    { source: 'Instagram', totalEnquiry: 400, activeEnquiry: 310, enquiryStage: 150, leadStage: 100, prospectStage: 60 },
    { source: 'Google Ads', totalEnquiry: 600, activeEnquiry: 480, enquiryStage: 240, leadStage: 160, prospectStage: 80 },
    { source: 'Client Referral', totalEnquiry: 300, activeEnquiry: 265, enquiryStage: 120, leadStage: 90, prospectStage: 55 },
    { source: 'Website', totalEnquiry: 450, activeEnquiry: 365, enquiryStage: 180, leadStage: 130, prospectStage: 55 },
];

const statusWiseData = [
    { source: 'Facebook', totalEnquiry: 500, activeEnquiry: 420, cold: 200, warm: 150, hot: 70 },
    { source: 'Instagram', totalEnquiry: 400, activeEnquiry: 310, cold: 150, warm: 100, hot: 60 },
    { source: 'Google Ads', totalEnquiry: 600, activeEnquiry: 480, cold: 240, warm: 160, hot: 80 },
    { source: 'Client Referral', totalEnquiry: 300, activeEnquiry: 265, cold: 120, warm: 90, hot: 55 },
    { source: 'Website', totalEnquiry: 450, activeEnquiry: 365, cold: 180, warm: 130, hot: 55 },
];

// Chart color schemes
const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

function DateRangePicker() {
    return (
        <div className="input-group">
            <span className="input-group-text bg-primary text-white">
                <Calendar size={18} />
            </span>
            <input type="date" className="form-control" placeholder="Start Date" />
            <span className="input-group-text bg-light">to</span>
            <input type="date" className="form-control" placeholder="End Date" />
            <button className="btn btn-primary" type="button">Apply</button>
        </div>
    );
}

function FilterDropdown({ title, options }) {
    return (
        <div className="dropdown me-2">
            <button className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Filter size={16} className="me-1" />
                {title}
                <ChevronDown size={16} className="ms-1" />
            </button>
            <ul className="dropdown-menu">
                {options.map((option, index) => (
                    <li key={index}>
                        <div className="dropdown-item">
                            <input type="checkbox" className="form-check-input me-2" id={`${title}-${index}`} />
                            <label className="form-check-label" htmlFor={`${title}-${index}`}>{option}</label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function TableCard({ title, columns, data, chartType }) {
    const [showTable, setShowTable] = useState(true);

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                <h5 className="card-title m-0 fw-bold">{title}</h5>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="tableToggle" checked={showTable} onChange={() => setShowTable(!showTable)} />
                    <label className="form-check-label" htmlFor="tableToggle">
                        {showTable ? 'Hide Table' : 'Show Table'}
                    </label>
                </div>
            </div>
            <div className="card-body">
                {showTable && (
                    <div className="table-responsive mb-4">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    {columns.map((column, index) => (
                                        <th key={index} scope="col" className="fw-semibold">{column}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((column, colIndex) => {
                                            const key = column.toLowerCase().replace(/\s+/g, '');
                                            return (
                                                <td key={colIndex}>
                                                    {colIndex > 1 && typeof row[key] === 'number' ? (
                                                        <span className={`${row[key] > 100 ? 'text-success' : row[key] < 50 ? 'text-danger' : ''}`}>
                                                            {row[key]}
                                                        </span>
                                                    ) : (
                                                        row[key]
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div style={{ height: 350 }}>
                    {chartType === 'bar' && (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey={columns[1].toLowerCase().replace(/\s+/g, '')} tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                {columns.slice(2).map((column, index) => (
                                    <Bar
                                        key={index}
                                        dataKey={column.toLowerCase().replace(/\s+/g, '')}
                                        fill={colors[index % colors.length]}
                                        radius={[4, 4, 0, 0]}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                    {chartType === 'line' && (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey={columns[1].toLowerCase().replace(/\s+/g, '')} tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                {columns.slice(2).map((column, index) => (
                                    <Line
                                        key={index}
                                        type="monotone"
                                        dataKey={column.toLowerCase().replace(/\s+/g, '')}
                                        stroke={colors[index % colors.length]}
                                        dot={{ stroke: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                    {chartType === 'pie' && (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie
                                    data={data}
                                    dataKey={columns[2].toLowerCase().replace(/\s+/g, '')}
                                    nameKey={columns[1].toLowerCase().replace(/\s+/g, '')}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    innerRadius={60}
                                    fill="#8884d8"
                                    paddingAngle={2}
                                    label
                                >
                                    {data.map((entry, index) => (
                                        <Pie key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    )}
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1">Previous</a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

function Example() {
    const [activeTab, setActiveTab] = useState('sourceWisePerformance');
    const [chartView, setChartView] = useState('bar');

    const tabs = [
        { id: 'sourceWisePerformance', title: 'Source Wise Performance', icon: <BarChart3 size={18} /> },
        { id: 'bulkUpload', title: 'Bulk Upload Validation', icon: <Layers size={18} /> },
        { id: 'validationWise', title: 'Validation Report', icon: <Activity size={18} /> },
        { id: 'activityWise', title: 'Activity Report', icon: <Activity size={18} /> },
        { id: 'stageWise', title: 'Stage Wise Report', icon: <Layers size={18} /> },
        { id: 'statusWise', title: 'Status Report', icon: <PieChart size={18} /> }
    ];

    const sourceOptions = ['Facebook', 'Instagram', 'Google Ads', 'Client Referral', 'Website'];
    const mediumOptions = ['Social Media', 'Digital', 'Referral', 'Organic'];

    return (
        <div className="min-vh-100 bg-light">
            {/* Main Content */}
            <div className="flex-grow-1">
                {/* Header */}
                <header className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <h4 className="m-0">{tabs.find(tab => tab.id === activeTab)?.title || 'Dashboard'}</h4>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                            <input type="text" className="form-control" placeholder="Search..." style={{ paddingLeft: '35px', borderRadius: '20px' }} />
                            <Search size={16} className="position-absolute" style={{ top: '10px', left: '10px', opacity: 0.5 }} />
                        </div>
                        <button className="btn btn-outline-secondary me-2">
                            <RefreshCw size={16} />
                        </button>
                    </div>
                </header>

                <div className="container-fluid p-4">
                    {/* Page Content */}
                    <div className="row mb-4">
                        {/* Summary Cards */}
                        <div className="col-md-3 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="text-muted mb-1">Total Enquiries</h6>
                                            <h3 className="mb-0">2,547</h3>
                                        </div>
                                        <div className="bg-primary bg-opacity-10 p-3 rounded">
                                            <Activity size={24} className="text-primary" />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <span className="text-success">+12.5%</span> from last month
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="text-muted mb-1">Valid Enquiries</h6>
                                            <h3 className="mb-0">1,923</h3>
                                        </div>
                                        <div className="bg-success bg-opacity-10 p-3 rounded">
                                            <BarChart3 size={24} className="text-success" />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <span className="text-success">+8.3%</span> from last month
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="text-muted mb-1">Conversion Rate</h6>
                                            <h3 className="mb-0">24.8%</h3>
                                        </div>
                                        <div className="bg-warning bg-opacity-10 p-3 rounded">
                                            <PieChart size={24} className="text-warning" />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <span className="text-danger">-2.1%</span> from last month
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="text-muted mb-1">Total Sales</h6>
                                            <h3 className="mb-0">631</h3>
                                        </div>
                                        <div className="bg-info bg-opacity-10 p-3 rounded">
                                            <Layers size={24} className="text-info" />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        hotspots
                                        <span className="text-success">+15.2%</span> from last month
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <DateRangePicker />
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex justify-content-end">
                                        <FilterDropdown title="Medium" options={mediumOptions} />
                                        <FilterDropdown title="Source" options={sourceOptions} />
                                        <div className="btn-group ms-2">
                                            <button
                                                type="button"
                                                className={`btn ${chartView === 'bar' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => setChartView('bar')}
                                            >
                                                <BarChart3 size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                className={`btn ${chartView === 'line' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => setChartView('line')}
                                            >
                                                <Activity size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                className={`btn ${chartView === 'pie' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => setChartView('pie')}
                                            >
                                                <PieChart size={18} />
                                            </button>
                                        </div>
                                        <button className="btn btn-success ms-2 d-flex align-items-center">
                                            <Download size={16} className="me-1" />
                                            Export
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3" style={{ width: "230px" }}>
                            <label htmlFor="reportType" className="form-label fw-bold">Report Type:</label>
                            <select
                                className="form-select"
                                id="reportType"
                                value={activeTab}
                                onChange={(e) => setActiveTab(e.target.value)}
                            >
                                {tabs.map(tab => (
                                    <option key={tab.id} value={tab.id}>{tab.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {activeTab === 'sourceWisePerformance' && (
                        <TableCard
                            title="Source Wise Performance Analysis"
                            columns={["Medium", "Source", "Total Enquiry", "Valid Enquiry", "Lead", "Opportunity", "Quote", "Schedule", "Sales"]}
                            data={sourceWisePerformanceData}
                            chartType={chartView}
                        />
                    )}

                    {activeTab === 'bulkUpload' && (
                        <TableCard
                            title="Source wise Bulk upload Enquiry validation"
                            columns={["Upload Date", "Medium", "Source", "Total Data", "Valid Data", "Invalid Data", "New Data", "Active Data", "Dead Data"]}
                            data={bulkUploadData}
                            chartType={chartView}
                        />
                    )}

                    {activeTab === 'validationWise' && (
                        <TableCard
                            title="Validation wise Enquiry Report"
                            columns={["Source", "Total Enquiry", "Valid Enquiry", "Invalid Enquiry", "Dead Enquiry", "Active Enquiry", "No Response Enquiry", "New Enquiry", "Sales"]}
                            data={validationWiseData}
                            chartType={chartView}
                        />
                    )}

                    {activeTab === 'activityWise' && (
                        <TableCard
                            title="Activity wise Enquiry Report"
                            columns={["Source", "Total Enquiry", "Valid Enquiry", "Enquiry", "Quote", "Schedule", "Sales", "Not-Interested"]}
                            data={activityWiseData}
                            chartType={chartView}
                        />
                    )}

                    {activeTab === 'stageWise' && (
                        <TableCard
                            title="Enquiry Stage Wise Enquiry Report"
                            columns={["Source", "Total Enquiry", "Active Enquiry", "Enquiry Stage", "Lead Stage", "Prospect Stage"]}
                            data={stageWiseData}
                            chartType={chartView}
                        />
                    )}

                    {activeTab === 'statusWise' && (
                        <TableCard
                            title="Enquiry Status Wise Report"
                            columns={["Source", "Total Enquiry", "Active Enquiry", "Cold", "Warm", "Hot"]}
                            data={statusWiseData}
                            chartType={chartView}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Example;