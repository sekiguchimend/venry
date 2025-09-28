'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/SidebarContext';
import {
  HelpCircle,
  MessageSquare,
  Settings,
  RefreshCw,
  FileText,
  ClipboardList,
  RotateCcw,
  ArrowRight,
  MessageCircle,
  Users,
  ArrowUp,
  UserPlus,
  Cog,
  Calendar,
  CheckSquare,
  Upload,
  UserX,
  Square,
  ChevronDown,
  ChevronLeft,
  ChevronsLeft
} from 'lucide-react';

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const MenuItem = React.memo<MenuItemProps>(({ href, icon, label, isActive, isCollapsed }) => {
  return (
    <Link
      href={href}
      className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: isCollapsed ? '12px 10px' : '12px 20px',
        fontSize: '14px',
        color: isActive ? '#1976d2' : '#424242',
        backgroundColor: isActive ? '#e3f2fd' : 'transparent',
        borderLeft: `3px solid ${isActive ? '#1976d2' : 'transparent'}`,
        transition: 'background-color 0.15s ease, border-left-color 0.15s ease, color 0.15s ease, padding 0.2s ease',
        textDecoration: 'none',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
      }}
      title={isCollapsed ? label : undefined}
    >
      <span style={{
        width: '20px',
        height: '20px',
        marginRight: isCollapsed ? '0' : '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isActive ? '#1976d2' : '#757575'
      }}>
        {icon}
      </span>
      {!isCollapsed && (
        <span style={{ fontWeight: isActive ? 500 : 400 }}>{label}</span>
      )}
    </Link>
  );
});

const MENU_ITEMS = [
  { href: '/support', IconComponent: HelpCircle, label: 'Mr.Venreyサポート' },
  { href: '/notices', IconComponent: MessageSquare, label: 'お知らせ' },
  { href: '/id-pass', IconComponent: Settings, label: 'ID・PASS登録' },
  { href: '/content-update', IconComponent: RefreshCw, label: 'コンテンツ更新' },
  { href: '/template', IconComponent: FileText, label: 'テンプレート' },
  { href: '/simple-update', IconComponent: ClipboardList, label: '簡単一括更新' },
  { href: '/immediate-update', IconComponent: RotateCcw, label: '即座・接客一括更新' },
  { href: '/photo-diary', IconComponent: ArrowRight, label: '写メ日記配信' },
  { href: '/girl-list', IconComponent: MessageCircle, label: '女性一覧' },
  { href: '/standing', IconComponent: Users, label: '立ち替え' },
  { href: '/girl-status', IconComponent: ArrowUp, label: '女性登録状況一覧' },
  { href: '/auto-generation', IconComponent: UserPlus, label: 'AI自動生成' },
  { href: '/weekly-schedule', IconComponent: Cog, label: '週間スケジュール' },
  { href: '/today-schedule', IconComponent: Calendar, label: '当日スケジュール' },
  { href: '/monthly-schedule', IconComponent: CheckSquare, label: '月間スケジュール' },
  { href: '/dispatch-info-update', IconComponent: Upload, label: '出勤情報をサイトへ更新' },
  { href: '/girl-site-update', IconComponent: UserX, label: '女性をサイトへ更新' },
  { href: '/girl-site-delete', IconComponent: Square, label: '女性をサイトから削除' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const menuItems = useMemo(
    () => MENU_ITEMS.map(item => ({
      ...item,
      icon: <item.IconComponent size={18} />
    })),
    []
  );

  return (
    <aside
      style={{
        width: isCollapsed ? '60px' : '220px',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        transition: 'width 0.2s ease'
      }}
      className="hide-scrollbar"
    >
      {/* Top Section */}
      <div style={{
        padding: isCollapsed ? '16px 8px' : '16px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
        transition: 'padding 0.2s ease'
      }}>
        {/* Toggle Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-end',
          marginBottom: '12px'
        }}>
          <ChevronsLeft
            size={20}
            style={{
              color: '#666',
              cursor: 'pointer',
              transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
            onClick={toggleSidebar}
          />
        </div>

        {!isCollapsed && (
          <>
            {/* Hotel Selection */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              {/* Kyoto Icon */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FF9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                京都
              </div>

              {/* Hotel Name and Dropdown */}
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: '#333',
                    fontWeight: '400'
                  }}>
                    京都ホテル協会邸...
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: '#666',
                      marginLeft: '4px'
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {isCollapsed && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '8px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#FF9800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              京
            </div>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, paddingTop: '8px', paddingBottom: '8px' }}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Footer Section */}
      {!isCollapsed && (
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fafafa'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#9e9e9e',
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            <p style={{ margin: 0 }}>© 2024 Mr.Venrey</p>
            <p style={{ margin: '4px 0 0 0' }}>Version 1.0.0</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;