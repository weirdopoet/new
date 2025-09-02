import React from 'react';
import { Category } from '../../types';

interface SidebarProps {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category;
}

const categories = [
  { name: Category.ALL, icon: 'M4 6h16M4 12h16M4 18h16' },
  { name: Category.IRL, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: Category.ENTERTAINMENT, icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
  { name: Category.SKITS, icon: 'M16 17l-4 4m0 0l-4-4m4 4V3' },
  { name: Category.EIGHTEEN_PLUS, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
];

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <aside className="w-64 bg-base-light p-4 flex-shrink-0 hidden md:block overflow-y-auto">
      <nav className="space-y-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
              selectedCategory === cat.name
                ? 'bg-base-blue text-white'
                : 'text-base-subtle hover:bg-base-dark hover:text-base-text'
            }`}
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={cat.icon} />
            </svg>
            <span className="font-medium">{cat.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
