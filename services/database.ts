// services/database.ts
import { supabase } from '../services/supabase';
import { Video, User, Comment } from '../types';

export const DatabaseService = {
  // Videos
  async createVideo(video: Omit<Video, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('videos')
      .insert(video)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getVideos(category?: string) {
    let query = supabase.from('videos').select('*');
    
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  // Users
  async createUser(user: Omit<User, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserByAddress(address: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', address)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
};
