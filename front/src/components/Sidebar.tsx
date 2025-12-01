'use client';

import React, { useMemo, useEffect, useLayoutEffect, useRef } from 'react';
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
  ChevronsLeft,
  X
} from 'lucide-react';

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const MenuItem = React.memo<MenuItemProps>(({ href, icon, label, isActive, isCollapsed, onClick }) => {
  return (
    <Link
      href={href}
      className={`sidebar-menu-item flex items-center ${isCollapsed ? 'px-2.5 justify-center' : 'px-5 justify-start'} py-3 text-sm transition-all duration-150 ease-in-out no-underline ${
        isActive ? 'active text-white bg-blue-600' : 'text-gray-700 bg-transparent'
      }`}
      onClick={onClick}
      title={isCollapsed ? label : undefined}
    >
      <span className={`w-5 h-5 flex items-center justify-center ${isCollapsed ? 'mr-0' : 'mr-3'} ${isActive ? 'text-white' : 'text-gray-600'}`}>
        {icon}
      </span>
      {!isCollapsed && (
        <span className={isActive ? 'font-medium' : 'font-normal'}>{label}</span>
      )}
    </Link>
  );
});

const FIXED_MENU_ITEM = { href: '/support', IconComponent: HelpCircle, label: 'Mr.Venreyサポート' };

const MENU_ITEMS = [
  { href: '/notices', IconComponent: MessageSquare, label: 'お知らせ' },
  { href: '/id-pass', IconComponent: Settings, label: 'ID・PASS登録' },
  { href: '/content-update', IconComponent: RefreshCw, label: 'コンテンツ更新' },
  { href: '/template', IconComponent: FileText, label: 'テンプレート' },
  { href: '/simple-update', IconComponent: ClipboardList, label: '簡単一括更新' },
  { href: '/immediate-update', IconComponent: RotateCcw, label: '即座・接客一括更新' },
  { href: '/photo-diary', IconComponent: ArrowRight, label: '写メ日記配信' },
  { href: '/girl-list', IconComponent: MessageCircle, label: '女性一覧' },
  { href: '/sorting', IconComponent: Users, label: '並び替え' },
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
  const { isCollapsed, toggleSidebar, isMobileMenuOpen, setIsMobileMenuOpen, getScrollPosition, setScrollPosition } = useSidebar();
  const navRef = useRef<HTMLElement>(null);

  // スクロール位置を保存
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      setScrollPosition(nav.scrollTop);
    };

    nav.addEventListener('scroll', handleScroll);
    return () => nav.removeEventListener('scroll', handleScroll);
  }, [setScrollPosition]);

  // pathname変更後にスクロール位置を復元
  useLayoutEffect(() => {
    const nav = navRef.current;
    const savedPosition = getScrollPosition();
    if (nav && savedPosition > 0) {
      requestAnimationFrame(() => {
        nav.scrollTop = savedPosition;
      });
    }
  }, [pathname, getScrollPosition]);

  const menuItems = useMemo(
    () => MENU_ITEMS.map(item => ({
      ...item,
      icon: <item.IconComponent size={18} />
    })),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleMenuItemClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[998] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`sidebar flex flex-col bg-white border-r border-gray-200 fixed z-40 transition-all duration-200 ease-in-out
          md:top-12 md:left-0 md:h-[calc(100vh-48px)] ${isCollapsed ? 'md:w-[60px]' : 'md:w-[220px]'}
          max-md:top-0 max-md:h-screen max-md:w-[280px] max-md:z-[999] max-md:shadow-lg max-md:transition-[left] max-md:duration-300 ${
            isMobileMenuOpen ? 'max-md:left-0' : 'max-md:-left-full'
          }`}
      >
        {/* Fixed Top Section */}
        <div className="flex-shrink-0">
          <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-b border-gray-200 bg-white transition-all duration-200`}>
            {/* Toggle/Close Buttons */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-3`}>
              <div className="hidden md:block">
                <ChevronsLeft
                  size={20}
                  className={`text-gray-600 cursor-pointer transition-transform duration-200 ${
                    isCollapsed ? 'rotate-180' : 'rotate-0'
                  }`}
                  onClick={toggleSidebar}
                />
              </div>
              <div className="block md:hidden">
                <X
                  size={24}
                  className="text-gray-600 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </div>

            {!isCollapsed && (
              <>
                {/* Hotel Selection */}
                <div className="flex items-center cursor-pointer">
                  {/* Kyoto Icon */}
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mr-3 text-white text-sm font-medium">
                    京都
                  </div>

                  {/* Hotel Name and Dropdown */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800 font-normal">
                        京都ホテル協会邸...
                      </span>
                      <ChevronDown
                        size={16}
                        className="text-gray-600 ml-1"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {isCollapsed && (
              <div className="flex justify-center mt-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium">
                  京
                </div>
              </div>
            )}
          </div>

          {/* Fixed Menu Item - Mr.Venreyサポート */}
          <div className="border-b border-gray-200">
            <MenuItem
              href={FIXED_MENU_ITEM.href}
              icon={<FIXED_MENU_ITEM.IconComponent size={18} />}
              label={FIXED_MENU_ITEM.label}
              isActive={pathname === FIXED_MENU_ITEM.href}
              isCollapsed={isCollapsed}
              onClick={handleMenuItemClick}
            />
          </div>
        </div>

        {/* Scrollable Menu Section */}
        <nav ref={navRef} className="flex-1 overflow-y-auto pt-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
              onClick={handleMenuItemClick}
            />
          ))}
        </nav>

        {/* Footer Section */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-[11px] text-gray-400 text-center leading-tight">
              <p className="m-0">© 2024 Mr.Venrey</p>
              <p className="mt-1 mb-0">Version 1.0.0</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
