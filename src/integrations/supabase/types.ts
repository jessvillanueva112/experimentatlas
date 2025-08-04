export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_url: string | null
          category: string
          description: string | null
          earned_at: string
          id: string
          points: number | null
          title: string
          user_id: string
        }
        Insert: {
          badge_url?: string | null
          category: string
          description?: string | null
          earned_at?: string
          id?: string
          points?: number | null
          title: string
          user_id: string
        }
        Update: {
          badge_url?: string | null
          category?: string
          description?: string | null
          earned_at?: string
          id?: string
          points?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      connections: {
        Row: {
          addressee_id: string
          common_interests: string[] | null
          created_at: string
          id: string
          match_score: number | null
          message: string | null
          requester_id: string
          status: Database["public"]["Enums"]["connection_status"] | null
          updated_at: string
        }
        Insert: {
          addressee_id: string
          common_interests?: string[] | null
          created_at?: string
          id?: string
          match_score?: number | null
          message?: string | null
          requester_id: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string
        }
        Update: {
          addressee_id?: string
          common_interests?: string[] | null
          created_at?: string
          id?: string
          match_score?: number | null
          message?: string | null
          requester_id?: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_addressee_id_fkey"
            columns: ["addressee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "connections_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      counseling_sessions: {
        Row: {
          counselor_id: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_virtual: boolean | null
          location: string | null
          notes: string | null
          scheduled_time: string
          status: Database["public"]["Enums"]["session_status"] | null
          student_id: string
          title: string
          updated_at: string
          virtual_link: string | null
        }
        Insert: {
          counselor_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          notes?: string | null
          scheduled_time: string
          status?: Database["public"]["Enums"]["session_status"] | null
          student_id: string
          title: string
          updated_at?: string
          virtual_link?: string | null
        }
        Update: {
          counselor_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          notes?: string | null
          scheduled_time?: string
          status?: Database["public"]["Enums"]["session_status"] | null
          student_id?: string
          title?: string
          updated_at?: string
          virtual_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "counseling_sessions_counselor_id_fkey"
            columns: ["counselor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "counseling_sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attended: boolean | null
          event_id: string
          id: string
          registered_at: string
          user_id: string
        }
        Insert: {
          attended?: boolean | null
          event_id: string
          id?: string
          registered_at?: string
          user_id: string
        }
        Update: {
          attended?: boolean | null
          event_id?: string
          id?: string
          registered_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      events: {
        Row: {
          category: Database["public"]["Enums"]["event_category"]
          created_at: string
          creator_id: string
          description: string | null
          end_time: string
          id: string
          image_url: string | null
          is_public: boolean | null
          is_virtual: boolean | null
          languages: string[] | null
          location: string | null
          max_attendees: number | null
          registration_required: boolean | null
          start_time: string
          tags: string[] | null
          title: string
          updated_at: string
          virtual_link: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["event_category"]
          created_at?: string
          creator_id: string
          description?: string | null
          end_time: string
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          is_virtual?: boolean | null
          languages?: string[] | null
          location?: string | null
          max_attendees?: number | null
          registration_required?: boolean | null
          start_time: string
          tags?: string[] | null
          title: string
          updated_at?: string
          virtual_link?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["event_category"]
          created_at?: string
          creator_id?: string
          description?: string | null
          end_time?: string
          id?: string
          image_url?: string | null
          is_public?: boolean | null
          is_virtual?: boolean | null
          languages?: string[] | null
          location?: string | null
          max_attendees?: number | null
          registration_required?: boolean | null
          start_time?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          virtual_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      messages: {
        Row: {
          attachment_url: string | null
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          message_type: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          attachment_url?: string | null
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          attachment_url?: string | null
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          contact_phone: string | null
          created_at: string
          display_name: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string
          home_country: string
          id: string
          interests: string[] | null
          is_counselor: boolean | null
          is_mentor: boolean | null
          languages: string[] | null
          last_name: string
          program: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          timezone: string | null
          university: string
          updated_at: string
          user_id: string
          year_of_study: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          contact_phone?: string | null
          created_at?: string
          display_name?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name: string
          home_country: string
          id?: string
          interests?: string[] | null
          is_counselor?: boolean | null
          is_mentor?: boolean | null
          languages?: string[] | null
          last_name: string
          program?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          timezone?: string | null
          university: string
          updated_at?: string
          user_id: string
          year_of_study?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          contact_phone?: string | null
          created_at?: string
          display_name?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string
          home_country?: string
          id?: string
          interests?: string[] | null
          is_counselor?: boolean | null
          is_mentor?: boolean | null
          languages?: string[] | null
          last_name?: string
          program?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          timezone?: string | null
          university?: string
          updated_at?: string
          user_id?: string
          year_of_study?: number | null
        }
        Relationships: []
      }
      risk_assessments: {
        Row: {
          academic_score: number
          calculated_at: string
          engagement_score: number
          id: string
          overall_risk_level: string
          user_id: string
          wellness_score: number
        }
        Insert: {
          academic_score: number
          calculated_at?: string
          engagement_score: number
          id?: string
          overall_risk_level: string
          user_id: string
          wellness_score: number
        }
        Update: {
          academic_score?: number
          calculated_at?: string
          engagement_score?: number
          id?: string
          overall_risk_level?: string
          user_id?: string
          wellness_score?: number
        }
        Relationships: []
      }
      support_requests: {
        Row: {
          assigned_counselor_id: string | null
          category: Database["public"]["Enums"]["support_category"]
          created_at: string
          description: string
          id: string
          is_anonymous: boolean | null
          response: string | null
          status: string | null
          title: string
          updated_at: string
          urgency: Database["public"]["Enums"]["urgency_level"] | null
          user_id: string | null
        }
        Insert: {
          assigned_counselor_id?: string | null
          category: Database["public"]["Enums"]["support_category"]
          created_at?: string
          description: string
          id?: string
          is_anonymous?: boolean | null
          response?: string | null
          status?: string | null
          title: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
          user_id?: string | null
        }
        Update: {
          assigned_counselor_id?: string | null
          category?: Database["public"]["Enums"]["support_category"]
          created_at?: string
          description?: string
          id?: string
          is_anonymous?: boolean | null
          response?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_requests_assigned_counselor_id_fkey"
            columns: ["assigned_counselor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "support_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_engagement_logs: {
        Row: {
          action_type: string
          created_at: string
          feature_used: string | null
          id: string
          session_duration: number | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          feature_used?: string | null
          id?: string
          session_duration?: number | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          feature_used?: string | null
          id?: string
          session_duration?: number | null
          user_id?: string
        }
        Relationships: []
      }
      wellness_checkins: {
        Row: {
          academic_stress: number
          created_at: string
          homesickness_level: number
          id: string
          mood_rating: number
          notes: string | null
          sleep_quality: number
          stress_level: number
          user_id: string
        }
        Insert: {
          academic_stress: number
          created_at?: string
          homesickness_level: number
          id?: string
          mood_rating: number
          notes?: string | null
          sleep_quality: number
          stress_level: number
          user_id: string
        }
        Update: {
          academic_stress?: number
          created_at?: string
          homesickness_level?: number
          id?: string
          mood_rating?: number
          notes?: string | null
          sleep_quality?: number
          stress_level?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      connection_status: "pending" | "accepted" | "blocked"
      event_category:
        | "academic"
        | "social"
        | "cultural"
        | "sports"
        | "career"
        | "volunteer"
        | "other"
      session_status: "scheduled" | "completed" | "cancelled" | "no_show"
      support_category:
        | "academic"
        | "mental_health"
        | "cultural"
        | "financial"
        | "housing"
        | "legal"
        | "other"
      urgency_level: "low" | "medium" | "high" | "critical"
      user_status: "active" | "inactive" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      connection_status: ["pending", "accepted", "blocked"],
      event_category: [
        "academic",
        "social",
        "cultural",
        "sports",
        "career",
        "volunteer",
        "other",
      ],
      session_status: ["scheduled", "completed", "cancelled", "no_show"],
      support_category: [
        "academic",
        "mental_health",
        "cultural",
        "financial",
        "housing",
        "legal",
        "other",
      ],
      urgency_level: ["low", "medium", "high", "critical"],
      user_status: ["active", "inactive", "suspended"],
    },
  },
} as const
