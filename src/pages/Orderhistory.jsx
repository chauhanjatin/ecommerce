import React, { useState, useEffect } from 'react'
import Header from '../component/navbar/Header'
import Footer from '../component/footer/footer'
import { Clock, ExternalLink, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Orderhistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
    setOrders(userOrders);
  }, []);

  return (
    <div className="font-sans antialiased text-text-heading bg-surface min-h-screen flex flex-col">
      <div className="page-x border-b border-border mb-4 sm:mb-8">
        <Header theme="light" />
      </div>

      <main className="flex-1 w-full page-x mb-20">
        <div className="w-full mt-6 md:mt-10 mb-8">
          <h1 className="text-3xl font-semibold mb-3">Order History</h1>
          <p className="text-text-muted text-[15px] max-w-4xl">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
        </div>

        <div className="w-full border border-border rounded-lg overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="bg-[#9A9A9A] text-white">
                <th className="py-4 px-6 font-medium w-[12%]">Order no</th>
                <th className="py-4 px-6 font-medium w-[25%]">Items</th>
                <th className="py-4 px-6 font-medium w-[15%]">Status</th>
                <th className="py-4 px-6 font-medium w-[15%]">Tracking ID</th>
                <th className="py-4 px-6 font-medium w-[15%]">Delivery Date</th>
                <th className="py-4 px-6 font-medium w-[10%]">Price</th>
                <th className="py-4 px-6 font-medium w-[8%]"></th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, i) => (
                  <tr key={i} className={`border-b border-border last:border-b-0 hover:bg-surface-alt transition-colors`}>
                    <td className="py-6 px-5 text-[15px] text-text-muted">{order.orderNo}</td>
                    <td className="py-6 px-5">
                      <div className="flex flex-col gap-4">
                        {order.items && order.items.map((item, j) => (
                          <div key={j} className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-image-bg rounded overflow-hidden shrink-0">
                              {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                            </div>
                            <span className="text-[15px] text-text-heading font-medium">{item.title}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-6 px-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ccbd3a] text-black rounded font-medium text-sm">
                        <Clock size={14} />
                        {order.status}
                      </div>
                    </td>
                    <td className="py-6 px-5">
                      <a href="#" className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-heading text-[15px] transition-colors underline decoration-border underline-offset-4">
                        {order.trackingId}
                        <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="py-6 px-5 text-[15px] text-text-muted whitespace-pre-wrap">
                      {order.deliveryDate.replace(" (", "\n(")}
                    </td>
                    <td className="py-6 px-5 text-[15px] text-text-heading font-medium">
                      ${order.price}
                    </td>
                    <td className="py-6 px-5 text-right">
                      <Link to="/products" className="inline-flex items-center gap-2 text-text-muted hover:text-text-heading text-[15px] font-medium transition-colors">
                        Re-Order <ArrowRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-text-muted text-[15px]">
                    You haven't placed any orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Orderhistory