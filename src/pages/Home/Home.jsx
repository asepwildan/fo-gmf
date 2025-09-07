import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HelpIcon, ReportIcon, PlaneIcon } from "../../assets/icons";
import QRModal from "../../components/ui/QRModal/QRModal.jsx";
import { QRCodeSVG } from "qrcode.react";
import { useReport } from "../../hooks/useReport.js";



import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrLink, setQRLink] = useState("Not Found!")
  const {
    generateQR,
    qrData,
    isGeneratingQR,
    error
  } = useReport();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  const handleReportClick = async () => {
    const reportId = 'RPT-002'; // ID report yang mau di-generate QR

    const result = await generateQR(reportId);

    if (result.success) {
      console.log('QR generated!', result.data);
      // qrData sekarang berisi response dari API
      setQRLink(result.data.link)
      setIsQRModalOpen(true);
    } else {
      console.error('Failed to generate QR:', result.error);
    }
  };

  return (
    <div className="home">
      {/* Header Section */}
      <header className="home__header">
        <div className="home__logo">
          <div className="logo__icon">
            <PlaneIcon width={32} height={32} />
          </div>
          <h1 className="logo__text">GMF AeroAsia</h1>
        </div>
        <div className="home__datetime">
          <div className="datetime__time">{formatTime(currentTime)}</div>
          <div className="datetime__date">{formatDate(currentTime)}</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="home__main">
        <div className="main__container">
          {/* Welcome Section */}
          <section className="welcome">
            <h2 className="welcome__title">Welcome to GMF Front Office</h2>
            <p className="welcome__subtitle">How can we assist you today?</p>
          </section>

          {/* Action Buttons */}
          <section className="actions">
            <div className="actions__container">
              <button
                className="action-btn action-btn--help"
                onClick={handleHelpClick}
              >
                <div className="action-btn__icon">
                  <HelpIcon width={48} height={48} />
                </div>
                <span className="action-btn__text">Help</span>
                <p className="action-btn__description">
                  Contact Customer Service
                </p>
              </button>

              <button
                className="action-btn action-btn--report"
                onClick={handleReportClick} disabled={isGeneratingQR}
              >

                {isGeneratingQR ? <p>
                  'Generating QR...'
                </p> : <>
                  <div className="action-btn__icon">
                    <ReportIcon width={48} height={48} />
                  </div>
                  <span className="action-btn__text">Report</span>
                  <p className="action-btn__description">Generate QR Code</p></>}


              </button>
            </div>
          </section>

          {/* Info Section */}
          <section className="info">
            <div className="info__grid">
              <div className="info__card">
                <div className="info__icon">🕒</div>
                <h3>Operating Hours</h3>
                <p>24/7 Available</p>
              </div>
              <div className="info__card">
                <div className="info__icon">📞</div>
                <h3>Emergency</h3>
                <p>Call +62-21-550-5555</p>
              </div>
              <div className="info__card">
                <div className="info__icon">📍</div>
                <h3>Location</h3>
                <p>Soekarno-Hatta Airport</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="home__footer">
        <p>&copy; 2025 GMF AeroAsia. All rights reserved.</p>
      </footer>

      {/* QR Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        title="Service Report QR Code"
        qrContent={
          <QRCodeSVG
            value={qrLink}
            size={180}
            level="M"
            includeMargin={true}
          />
        }
        reportData={{
          id: "GMF-2025-" + Date.now().toString().slice(-4),
          timestamp: new Date().toLocaleString("id-ID"),
          type: "Service Report",
          status: "Active",
        }}
      />
    </div>
  );
};

export default Home;
