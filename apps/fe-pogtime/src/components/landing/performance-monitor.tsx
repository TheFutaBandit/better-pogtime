'use client';

import { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fid = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }));
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed top-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50 font-mono">
      <div className="mb-2 font-bold">Performance Metrics</div>
      <div>FCP: {metrics.fcp.toFixed(0)}ms</div>
      <div>LCP: {metrics.lcp.toFixed(0)}ms</div>
      <div>FID: {metrics.fid.toFixed(0)}ms</div>
      <div>CLS: {metrics.cls.toFixed(3)}</div>
    </div>
  );
};

export default PerformanceMonitor;
