ALTER TABLE `fmr_master_user_audio` ADD `urls` varchar(512) NOT NULL;--> statement-breakpoint
ALTER TABLE `fmr_master_user_audio_record` ADD `urls` varchar(512) NOT NULL;--> statement-breakpoint
ALTER TABLE `fmr_master_user_audio_record` ADD `startTime` datetime(6) NOT NULL;--> statement-breakpoint
ALTER TABLE `fmr_master_user_audio_record` ADD `endTime` datetime(6) NOT NULL;--> statement-breakpoint
ALTER TABLE `fmr_master_user_audio` DROP COLUMN `path`;--> statement-breakpoint
ALTER TABLE `fmr_master_user_audio_record` DROP COLUMN `path`;